import styles from './SendForm.module.css'
import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useAtom } from 'jotai'
import { chatIdAtom } from '../channelBox/ChannelLi'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

export interface NewMsg {
    creator: number
    content: string
}

const SendForm = () => {

  const userData = useAppSelector((state) => state.user.userData) as UserData

async function sendNewMsg(data: NewMsg) {
	const response = await fetch(`http://localhost:8080/api/message/channelId/${chatId}`, {
		method: 'POST',
					headers: {
							'Content-Type': 'application/json',
						},
				 		body: JSON.stringify(data),
				// body: body,
				// credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to make POST request')
	}
	// getAllMsg()
}

	const [chatId] = useAtom(chatIdAtom)
	const [inputText, setInputText] = useState('')

	const handleCreation = (text: string) => {
	  // Tu lógica de manejo de la creación aquí
	  console.log('Received values of form: ', text)
	  const newMsg = {creator : userData.user.id, content : text}
	//   const newMsg = {creator : 1, content : text}
	  sendNewMsg(newMsg)
	  // Restablecer el campo de entrada después de enviar el mensaje
	  setInputText('')
	}
  
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
	  setInputText(event.target.value)
	}
  
	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
	  if (event.key === 'Enter') {
		handleCreation(inputText)
	  }
	}

    return (
        <div className={styles.textInputWrapper}>
            <input
                className={styles.textInput}
                placeholder="Send message"
                type="text"
				value={inputText}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default SendForm

import styles from './BoardGame.module.css'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

interface Position {
    x: number
    y: number
}
interface Size {
    width: number
    height: number
}

interface Rectangle {
    size: Size
    position: Position
}

interface Frame {
    paddleLeft: Rectangle
    paddleRight: Rectangle
    ball: Rectangle
}

function drawRectangle(
    ctx: CanvasRenderingContext2D,
    rectangle: Rectangle
): void {
    ctx.fillStyle = 'white'
    ctx.fillRect(
        rectangle.position.x,
        rectangle.position.y,
        rectangle.size.width,
        rectangle.size.height
    )
}

const socket = io('http://localhost:8080')

const BoardGame = () => {
    const [frame, setFrame] = useState<Frame>({
        paddleLeft: {
            size: { width: 20, height: 100 },
            position: { x: 10, y: 20 },
        },
        paddleRight: {
            size: { width: 10, height: 50 },
            position: { x: 100, y: 70 },
        },
        ball: {
            size: { width: 10, height: 20 },
            position: { x: 50, y: 50 },
        },
    })

    useEffect(() => {
        console.log('render')
        let canvas: HTMLCanvasElement | null = document.getElementById(
            'boardGame'
        ) as HTMLCanvasElement
        if (canvas === null) {
            console.log('fail get canvas element')
            // TODO manage error
        }
        let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
        if (ctx === null) {
            throw 'fail get context'
            // TODO manage error
        }

        ctx.clearRect(0, 0, 1000, 1000)
        drawRectangle(ctx, frame.paddleLeft)
        drawRectangle(ctx, frame.paddleRight)
        drawRectangle(ctx, frame.ball)
    }, [frame])

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            console.log('up')
            socket.emit('movePaddle', { direction: 'up' })
        } else if (event.key === 'ArrowDown') {
            console.log('down')
            socket.emit('movePaddle', { direction: 'down' })
        }
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server')
        })

        function onReceiveFrames(updatedFrame: Frame) {
            console.log('updated frame: ', JSON.stringify(updatedFrame))
            setFrame(updatedFrame) // Actualiza el frame cuando se recibe del servidor
        }

        socket.emit('getFrame', {}, (response: Frame) => {
            setFrame(response) // Establece el frame inicial cuando se recibe del servidor al conectarse
        })

        // Event listener to captures up and down keys
        document.addEventListener('keydown', handleKeyDown)

        // Registro del evento para recibir fotogramas actualizados del servidor
        socket.on('sendFrames', onReceiveFrames)

        return () => {
            // Eliminar el event listener al desmontar el componente para evitar fugas de memoria
            document.removeEventListener('keydown', handleKeyDown)

            // Desregistrar el evento para recibir fotogramas actualizados del servidor
            console.log('Unregistering event...')
            socket.off('sendFrames', onReceiveFrames)
        }
    }, [])

    return <canvas id="boardGame" className={styles.boarGame}></canvas>
}

export default BoardGame

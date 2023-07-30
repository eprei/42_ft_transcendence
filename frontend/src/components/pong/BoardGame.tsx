import styles from './BoardGame.module.css'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// import theme1 from '../../assets/bg/theme1.jpg'
// import theme2 from '../../assets/bg/theme2.avif'
// import theme3 from '../../assets/bg/theme3.avif'

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
    score: { playerOne: number; playerTwo: number }
    gameOver: boolean
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

export interface BoardGameProps {
    room: string
    player_one: string
    player_two: string
    theme: string
}

const BoardGame = ({ room, player_one, player_two, theme }: BoardGameProps) => {
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
        score: { playerOne: 0, playerTwo: 0 },
        gameOver: false,
    })

    useEffect(() => {
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

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        drawRectangle(ctx, frame.paddleLeft)
        drawRectangle(ctx, frame.paddleRight)
        drawRectangle(ctx, frame.ball)
    }, [frame])

    useEffect(() => {
        const socket = io('http://localhost:8080')

        socket.on('connect', () => {
            console.log('Connected to server')
            socket.emit('createRoom', room)
        })

        socket.on('connect_error', (error) => {
            console.log('Connection Error', error)
        })

        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('room in handleKeyDown: ', room)
            if (event.key === 'ArrowUp') {
                console.log('up', room)
                socket.emit('movePaddle', { direction: 'up', roomId: room })
            } else if (event.key === 'ArrowDown') {
                console.log('down', room)
                socket.emit('movePaddle', { direction: 'down', roomId: room })
            }
        }

        function onReceiveFrames(updatedFrame: Frame) {
            // console.log('updated frame: ', JSON.stringify(updatedFrame))
            setFrame(updatedFrame)
            document.getElementById('scorePlayerOne').innerText =
                updatedFrame.score.playerOne.toString()
            document.getElementById('scorePlayerTwo').innerText =
                updatedFrame.score.playerTwo.toString()

            // if (updatedFrame.gameOver) {
            //     let winner =
            //         updatedFrame.score.playerOne > updatedFrame.score.playerTwo
            //             ? 'Player One'
            //             : 'Player Two'
            //     alert(`Game Over! ${winner} won!`)
            //     socket.emit('resetGame')
            // }
        }

        // Event listener to captures up and down keys
        document.addEventListener('keydown', handleKeyDown)

        // Event registration to receive updated frames from the server
        socket.on('sendFrames', onReceiveFrames)

        return () => {
            // Remove the event listener when disassembling the component to avoid memory leaks
            document.removeEventListener('keydown', handleKeyDown)

            // Unregister event to receive updated frames from server
            console.log('Unregistering event...')
            socket.off('sendFrames', onReceiveFrames)
            socket.close()
            // socket.emit('leaveRoom', room)
        }
    }, [])

    // const themeImages: { [key: string]: string } = {
    // 	'theme 1': theme1,
    // 	'theme 2': theme2,
    // 	'theme 3': theme3,
    // }

    return (
        <div>
            <div className={styles.scoreContainer}>
                <div id="scorePlayerOne" className={styles.score}>
                    0
                </div>
                <div id="scorePlayerTwo" className={styles.score}>
                    0
                </div>
            </div>
            <canvas id="boardGame" className={styles.boardGame}></canvas>
        </div>
    )
}

export default BoardGame

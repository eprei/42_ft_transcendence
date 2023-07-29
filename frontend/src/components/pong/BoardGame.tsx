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
    score: { playerOne: number; playerTwo: number }
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
        score: { playerOne: 0, playerTwo: 0 },
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

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
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
            setFrame(updatedFrame) // Updates the frame when received from the server
            document.getElementById('scorePlayerOne').innerText =
                updatedFrame.score.playerOne.toString()
            document.getElementById('scorePlayerTwo').innerText =
                updatedFrame.score.playerTwo.toString()
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
        }
    }, [])

    return (
        <div>
            <div className={styles.scoreContainer}>
                <div id="scorePlayerOne" className={styles.score}>
                    0
                </div>
                <div id="scorePlayerTwo" className={styles.score}>
                    4
                </div>
            </div>
            <canvas id="boardGame" className={styles.boardGame}></canvas>
        </div>
    )
}

export default BoardGame

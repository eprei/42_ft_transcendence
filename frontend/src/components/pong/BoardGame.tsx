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

        console.log('actual frame render: ', JSON.stringify(frame))
    }, [frame])

	const handleKeyDown = (event: KeyboardEvent) => {
        // Capturar el evento cuando el usuario utiliza las flechas de arriba o abajo
        if (event.key === 'ArrowUp') {
			console.log('up')
            // Lógica para mover la paleta hacia arriba
            // Envía un evento al backend para actualizar la posición de la paleta
            socket.emit('movePaddle', { direction: 'up' });
        } else if (event.key === 'ArrowDown') {
			console.log('down')
            // Lógica para mover la paleta hacia abajo
            // Envía un evento al backend para actualizar la posición de la paleta
            socket.emit('movePaddle', { direction: 'down' });
        }
    };

    useEffect(() => {
        function onSendFrames(frame: Frame) {
            console.log('sendFrames: ', JSON.stringify(frame))
        }

        socket.emit('getFrame', {}, (response: Frame) => {
            console.log('getFrame: ', JSON.stringify(frame))
            setFrame(response)
        })

		// Function to recive the updated frame from the server
        function onReceiveFrames(frame: Frame) {
            setFrame(frame); // Actualiza el frame cuando se recibe del servidor
        }

		// Register event to receive updated frame from server
        socket.on('sendFrames', onReceiveFrames);

		// Agregar un event listener para capturar las flechas de arriba y abajo
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            socket.off('sendFrames', onSendFrames)
			// Eliminar el event listener al desmontar el componente
			// document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    return <canvas id="boardGame" className={styles.boarGame}></canvas>
}

export default BoardGame

import { useEffect } from 'react';

export function Canvas() {
    useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        let cw = window.innerWidth;
        let ch = window.innerHeight;

        canvas.width = cw;
        canvas.height = ch;

        let fontSize = 13;
        let maxColumns = cw / fontSize;

        window.addEventListener('resize', function (event) {
            cw = window.innerWidth;
            ch = window.innerHeight;
            canvas.width = cw;
            canvas.height = ch;
            maxColumns = cw / fontSize;
            console.log(cw, ch);
        }, true);

        let charArr = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "1", "2", "3", "4", "5", "6", "7", "8",
            "А", "В", "Г", "Д", "Є", "Ѕ", "З", "И", "Ѳ", "І", "К", "Л", "М", "Н", "Ѯ", "Ѻ", "П", "Ч", "Р", "С", "Т", "Ѵ", "Ф", "Х", "Ѱ", "Ѿ", "Ц",
        ];

        let maxCharCount = 300;
        let fallingCharArr: FallingChar[] = [];

        let frames = 0;

        class FallingChar {
            x: number;
            y: number;
            value: string;
            speed: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.value = '';
                this.speed = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                this.value = charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
                this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

                ctx.fillStyle = "rgba(0,255,0)";
                ctx.font = fontSize + "px sans-serif";
                ctx.fillText(this.value, this.x, this.y);
                this.y += this.speed;

                if (this.y > ch) {
                    this.y = (Math.random() * ch) / 2 - 50;
                    this.x = Math.floor(Math.random() * maxColumns) * fontSize;
                    this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
                }
            }
        }

        let update = () => {
            if (fallingCharArr.length < maxCharCount) {
                let fallingChar = new FallingChar(
                    Math.floor(Math.random() * maxColumns) * fontSize,
                    (Math.random() * ch) / 2 - 50
                );
                fallingCharArr.push(fallingChar);
            }
            ctx.fillStyle = "rgba(0,0,0,0.05)";
            ctx.fillRect(0, 0, cw, ch);
            for (let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++) {
                fallingCharArr[i].draw(ctx);
            }

            requestAnimationFrame(update);
            frames++;
        };

        update();
    }, []);
    
    return <canvas id="canvas"></canvas>;
}
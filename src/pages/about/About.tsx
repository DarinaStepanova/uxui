import style from './About.module.css';
function About() {
    return (
    <div className={style.About}>
        <div className={style.blocks}>
            <div className={style.block1}> 
                <img src="src\img\1_1.jpg" alt="" />
                <div className={style.block1_1}>
                    <p><b>Представляем вашему вниманию API от нейросети Кандински (Kandinsky).</b></p>
                    <p>Kandinsky - это модель искусственного интеллекта, которая может создавать реалистичные изображения и произведения искусства на основе описания на естественном языке.</p>
                </div>
                <img src="src\img\1_2.jpg" alt="" />
            </div>
        <div className={style.block}>
            <p>В настоящее время по API доступна версия Kandinsky 3.1 с более реалистичными, точными изображениями.</p>
            <img src="src\img\1.jpeg" alt="" />
            <img src="src\img\2.jpeg" alt="" />
            <p>Запросы на русском, английском или любом другом языке и emoji в текстовом описании.</p>
        </div>
        <div className={style.block}>
            <img src="src\img\3.jpeg" alt="" />
            <img src="src\img\4.jpeg" alt="" />
            <img src="src\img\5.jpeg" alt="" />
            <img src="src\img\6.jpeg" alt="" />
        </div>
        <div>
            <p>API Kandinsky для создания уникальных изображений предоставляет удобный способ генерации реалистичного контента для ваших продуктов и сервисов. Следуя инструкциям в этой документации, вы можете легко интегрировать API в свой проект. Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами по адресу hello@fusionbrain.ai.</p>
        </div>
        </div>
    </div>
    );
   }
   export default About;
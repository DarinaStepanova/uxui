import style from './Paint.module.css';
import { Button } from '../../components/button';
import { useState } from 'react';
import React from 'react';

function Paint() {
    const [imageUrl, setImageUrl] = useState('');
    const [prompt, setPrompt] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка генерации');
            }

            const data = await response.json();
            if (data.image_base64) {
                setImageUrl(`data:image/jpeg;base64,${data.image_base64}`); 
            } else {
                throw new Error("API вернул неожиданный ответ");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };
    const saveImage = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'generated_image.jpeg'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            setError('Нет изображения для сохранения!');
        }
    };
    return (
        <div className={style.Block}>
            <div className={style.textblock}>
                <textarea
                    placeholder="Опишите изображение, которое хотели бы сгенерировать"
                    value={prompt}
                    onChange={handlePromptChange}
                />
                <Button label={loading ? 'Генерируется...' : 'Сгенерировать'} 
                    onClick={generateImage} color="green" size="large"/> 
            </div>
            <div className={style.resultblock}>
                <div className={style.imgblock}>
                    {error ? <p style={{ color: 'red', textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'}}>{error}</p> : imageUrl ? <><img src={imageUrl} alt="Сгенерированное изображение" /><Button label="Сохранить изображение" onClick={saveImage} color="blue" size='medium'/></>:<p>Здесь будет сгенерированное изображение. Время ожидания - 1 минута.<React.Fragment><br/><br/></React.Fragment>У вас пока нет сгенерированных изображений, введите описание и попробуйте создать свое первое изображение.</p>}
                    {/* {imageUrl && <img src={imageUrl} alt="Сгенерированное изображение" />}
                    {!imageUrl && !error && <p>Здесь будет сгенерированное изображение. Время ожидания - 1 минута.<React.Fragment><br/></React.Fragment>У вас пока нет сгенерированных изображений, введите описание и попробуйте создать свое первое изображение.</p>}
                    {error && <p style={{ color: 'red', textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'}}>{error}</p>} */}
                </div>
                {/* {error ? <></> : imageUrl ? <Button label="Сохранить изображение" onClick={saveImage} color="blue" size='medium'/> : <></> } */}
                
            </div>
        </div>
    );
}

export default Paint;
import { useNavigate} from 'react-router-dom';
import { Button } from '../../components/button';
import style from './Home.module.css'
function Home() {
   const navigate = useNavigate();
 return (
 <div className={style.Home} style={{color: 'white'}}>
      <div className='head'>
         <div className={style.header}>
            <h1>Neuropic</h1>
         </div>
         <h2>Нейросеть, которая рисует по словам онлайн</h2>
         <p style={{paddingBottom: '2em'}}>
         Neuropic - это уникальный сервис, на котором вы можете генерировать любые изображения с помощью нейросети. Нужно лишь попросить нейросеть - и создавайте изображения с нуля. 
         Попробовать нейросеть, которая рисует по вашему описанию, можно бесплатно!
         </p>
         <Button 
         label="Нарисовать бесплатно"
         onClick={() => navigate('/paint')}
         color="blue"
         size="large"
         />
      </div>
      <div className='products'>
         <img src="src\img\pict.svg" alt="" />
      </div>
   </div>
 );
}
export default Home;

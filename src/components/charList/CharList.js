import { useState, useEffect, useRef } from 'react';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }



   const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {

        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading (newItemLoading=> false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    const onError = () => {
        setLoading(loading=> false);
        setError(error=> true);
    }

    const itemRefs = useRef([]);

    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    
       
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = newItemLoading ? <Spinner /> : null; 
      
        
        const CharItem = ({charList}) => {

          

            const items = charList.map((item) => {
                let imgStyle = {'objectFit' : 'cover'};
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
                
                return (
                    
                    <li className="char__item" 
                        key={item.id} 
                        
                        onClick={() => props.onCharSelected(item.id)
                                        }
                        disabled = {newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}>
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
            })    
            return (
            <ul className="char__grid">
                {items}
            </ul>
            )
        }
        
        const content = !(loading || error) ? <CharItem charList={charList}/> : null;

        return (
            <div className="char__list">
                
                   {errorMessage}
                   {spinner}
                   {content}
               
                <button 
                        className="button button__main button__long"
                        disabled = {newItemLoading}
                        onClick = {() => onRequest(offset)}
                        >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    

    
       
}

export default CharList;
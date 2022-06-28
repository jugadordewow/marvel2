//предохранитель обязательно нужен только классовый стоит и ловит ошибки приложения + может запускать запасные компоненты взамен сломавшегося ошибки ловят в методе рендер, методах жизненного цикла и в конструкторах дочерних компонентов не ловят ошибки внутри обработчика событий, осинхронного кода, в самом предохранители, серверный рендеринг

import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error:false
    }
    //обновляет только состояние никаких логов и замен, только изменение state
    // static getDerivedStateFromError(error){
    //     return {error: true};
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
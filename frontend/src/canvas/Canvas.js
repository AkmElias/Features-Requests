import Features from './components/Features';
import AddFeature from './components/AddFeature';
import './assets/style.css'

const Canvas = () => {
    return (
        <div className="canvas">
            <Features />
            <AddFeature />
        </div>
    )
}

export default Canvas;
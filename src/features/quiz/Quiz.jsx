import { useParams } from "react-router-dom"

function Quiz() {
    const { quizId } = useParams();
    return (
        <div>
            {quizId}
        </div>
    )
}

export default Quiz
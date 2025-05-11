import UserData from "./userData";

export default function Header(){
    return(
        <div className="bg-red-500">
            <h1 className="font-bold text-[30px] text-blue-600">Crystal Beauty Clear</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eum nihil, necessitatibus veritatis dolor nisi molestias rerum. Perferendis voluptatibus nesciunt aspernatur provident voluptatem iusto porro facere! Expedita quibusdam voluptates labore!</p>
            <UserData></UserData>

        </div>
    )
}
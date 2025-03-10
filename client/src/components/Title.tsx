const Title = ({title, ind} : {ind? : number , title : string}) => {
    return (
        <div className="w-full relative flex max-sm:flex-col max-sm:items-start gap-4 items-center font-bold text-xl sm:text-3xl">
            <span className="count text-[2rem] sm:text-[3rem]">
                {ind && ind < 10 ? "0" + ind : ind}
            </span>
            {title}
        </div>
    )
}
export default Title
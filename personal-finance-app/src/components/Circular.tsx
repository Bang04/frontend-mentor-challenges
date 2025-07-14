export const Circular = (
    count?: number,
    percentage?: number[],
    text?: string[]
) => {
    const circle=0;


    return (
        <div className="flex justify-center itmes-center">
            <div className="w-[20vw] relative">
  <svg className="w-full h-full rotate-[-90deg]">
    <circle
      cx="50%"
      cy="50%"
      r="45%"
      stroke="lightgray"
      stroke-width="10"
      fill="none"
    />
    <circle
      cx="50%"
      cy="50%"
      r="45%"
      stroke="skyblue"
      stroke-width="10"
      fill="none"
      stroke-dasharray="282.6"
      stroke-dashoffset="84.78"
      stroke-linecap="round"
    />
    <circle
      cx="50%"
      cy="50%"
      r="45%"
      stroke="blue"
      stroke-width="10"
      fill="none"
      stroke-dasharray="282.6"
      stroke-dashoffset="124.78"
      stroke-linecap="round"
    />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-sky-500">
    70%
  </div>
</div>
        </div>
    )




}


export const Box = (): JSX.Element => {
  return (
    <div className="w-[200px] h-[150px]" style={{ position: 'fixed', left: 80, top: '34%', zIndex: 20 }}>
      <img
        className="w-full h-full"
        alt="Vector"
        src={"/vector.svg"}
      />
    </div>
  );
};

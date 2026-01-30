export const Cup = (): JSX.Element => {
  return (
    <div style={{ position: 'fixed', left: 220, bottom: 120, zIndex: 20, width: 92, height: 91 }}>
      <img
        style={{ width: '100%', height: '100%' }}
        alt="Cup"
        src={"/cup.svg"}
      />
    </div>
  );
};

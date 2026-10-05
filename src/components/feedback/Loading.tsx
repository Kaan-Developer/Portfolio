import kaanLogo from "../../assets/images/Logo.svg";

const Loading = () => {
  return (
    <div className="absolute inset-0 z-100 flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border">
          <img
            src={kaanLogo}
            alt="Kaan"
            className="h-8 w-8"
          />
        </div>

        <div className="h-px w-32 overflow-hidden bg-border">
          <div className="h-full w-1/2 animate-loading bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
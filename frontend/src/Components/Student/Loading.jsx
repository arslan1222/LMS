import React from 'react'

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#2c3e50] overflow-hidden m-0">
      <div className="relative w-20 h-20 kinetic" />
      <style>{`
        .kinetic::after,
        .kinetic::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 0;
          width: 0;
          border: 16px solid transparent;
          border-bottom-color: white;
        }

        .kinetic::after {
          animation: rotationA 2s linear infinite 0.5s;
        }

        .kinetic::before {
          transform: rotate(90deg);
          animation: rotationB 2s linear infinite;
        }

        @keyframes rotationA {
          0%, 25% {
            transform: rotate(0deg);
          }
          50%, 75% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotationB {
          0%, 25% {
            transform: rotate(90deg);
          }
          50%, 75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(450deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Loading

const Logo: React.FC = () => {
  return (
    <article className="flex flex-col items-center justify-center bg-main-ligth dark:bg-main w-[30vw] h-[30vw] md:w-[15vw] md:h-[15vw] rounded-full shadow-2xl logo-bg">
      <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] text-texto-dark dark:text-texto-ligth logo  font-semibold">
        Herz
      </h1>
    </article>
  );
};

export default Logo;

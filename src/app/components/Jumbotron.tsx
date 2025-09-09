import logo from "../../assets/full-logo.png";

export const Jumbotron = () => {
  return (
    <section className="flex items-center justify-center pb-4">
      <img src={logo} className="h-48" />
    </section>
  );
};

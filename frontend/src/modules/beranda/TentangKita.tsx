import Container from "@/components/Container";
import Header from "./components/Header";

const TentangKita = () => {
  return (
    <Container>
      <Header>
        Apa yang <span className="text-custom-blue">kamu</span> tahu tentang{" "}
        <span className="text-custom-orange">kita?</span>
      </Header>

      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2">
        {/* component yang dibikin fahmi nanti TARO SINI MI */}
      </div>
    </Container>
  );
};

export default TentangKita;

import { Link } from "react-router-dom";

import styles from "./Home.module.css";

function Home() {
  const produtosPC = [
    {
      nome: "Processador AMD Ryzen 5 5600X",
      preco: 999.9,
      Image:
        "https://img.terabyteshop.com.br/produto/g/processador-amd-ryzen-5-5600x-37ghz-46ghz-turbo-6-cores-12-threads-cooler-wraith-stealth-am4_139055.png",
      descricao:
        "Alta performance para jogos e multitarefas com 6 núcleos e 12 threads, ideal para setups de desempenho.",
    },
    {
      nome: "Processador Intel Core i5 12400F",
      preco: 1049.9,
      Image:
        "https://img.terabyteshop.com.br/produto/g/processador-intel-core-i5-12400f-25ghz-44ghz-turbo-12-geracao-6-cores-12-threads-lga-1700-bx8071512400f_135083.jpg",
      descricao:
        "Processador de 12ª geração com ótimo custo-benefício para produtividade e jogos modernos.",
    },
    {
      nome: "Placa-Mãe ASUS B550M Aorus Elite",
      preco: 850.0,
      Image:
        "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/b/5/b550m-aorus-elite3.jpg",
      descricao:
        "Placa-mãe robusta para processadores AMD com suporte a PCIe 4.0, ideal para upgrades.",
    },
    {
      nome: "Placa-Mãe Gigabyte B660M",
      preco: 759.9,
      Image:
        "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/b/6/b650m-d3hp3.jpg",
      descricao:
        "Compatível com processadores Intel 12ª geração, oferece estabilidade e recursos modernos.",
    },
    {
      nome: "Placa de Vídeo RTX 3060 12GB",
      preco: 1999.9,
      Image:
        "https://images4.kabum.com.br/produtos/fotos/153454/placa-de-video-msi-geforce-rtx-3060-ventus-2x-12g-oc-15-gbps-12gb-gddr6-ray-tracing_1616505819_gg.jpg",
      descricao:
        "Desempenho gráfico excelente com suporte a Ray Tracing e DLSS para jogos em alta qualidade.",
    },
    {
      nome: "Placa de Vídeo RX 6600 XT 8GB",
      preco: 1799.9,
      Image:
        "https://images4.kabum.com.br/produtos/fotos/235984/placa-de-video-asrock-amd-radeon-rx-6600-cld-8g-8gb-90-ga2rzz-00uanf_1634738812_gg.jpg",
      descricao:
        "Ideal para jogos em Full HD com alta taxa de quadros e ótimo custo-benefício.",
    },
    {
      nome: "Memória RAM Corsair 16GB (2x8) DDR4 3200MHz",
      preco: 389.9,
      Image:
        "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/c/m/cmw16gx4m2c3200c14_1.jpg",
      descricao:
        "Kit dual-channel com excelente desempenho e visual moderno com iluminação RGB.",
    },
    {
      nome: "Memória RAM Kingston 16GB DDR4 3200MHz",
      preco: 369.9,
      Image:
        "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/exfujapz/file.png",
      descricao:
        "Memória confiável e veloz para tarefas diárias e jogos, com ótimo custo-benefício.",
    },
    {
      nome: "SSD Kingston NV3, 1 TB, M.2 2280",
      preco: 399.9,
      Image:
        "https://images2.kabum.com.br/produtos/fotos/621162/ssd-pcie-kingston-nv3-1-tb-m-2-2280-nvme-leitura-6000-mb-s-e-gravacao-4000-mb-s-snv3s-1000g_1726082185_gg.jpg",
      descricao:
        "Velocidade de leitura de até 6000MB/s, ideal para boot rápido e carregamentos instantâneos.",
    },
    {
      nome: "SSD SATA Crucial 500GB",
      preco: 259.9,
      Image:
        "https://img.terabyteshop.com.br/produto/g/ssd-crucial-bx500-500gb-sata-iii-leitura-550mbs-gravacao-500mbs-ct500bx500ssd1_197479.jpg",
      descricao:
        "Solução de armazenamento acessível e rápida para sistemas e arquivos pessoais.",
    },
    {
      nome: "HD Seagate 1TB 7200RPM",
      preco: 259.9,
      Image:
        "https://http2.mlstatic.com/D_NQ_NP_705238-MLA84850890609_052025-O.webp",
      descricao:
        "Armazenamento confiável de alta capacidade para backup e arquivos pesados.",
    },
    {
      nome: "Gabinete Gamer Rise Mode Galaxy Glass",
      preco: 550,
      Image:
        "https://images9.kabum.com.br/produtos/fotos/613889/gabinete-gamer-rise-mode-galaxy-glass-standard-v2-mid-tower-atx-lateral-e-frontal-em-vidro-temperado-com-10-ventoinhas-preto-rm-ga-ggsb2-argb_1731436788_gg.jpg",
      descricao:
        "Visual moderno com vidro temperado e excelente ventilação com até 10 ventoinhas.",
    },
    {
      nome: "Fonte Corsair 650W 80 Plus Bronze",
      preco: 499.9,
      Image:
        "https://images6.kabum.com.br/produtos/fotos/516056/fonte-corsair-cx-series-cx650-650w-80-plus-bronze-sem-cabo-preto-cp-9020278-br_1714483460_gg.jpg",
      descricao:
        "Fonte confiável com certificação 80 Plus Bronze, ideal para setups intermediários.",
    },
    {
      nome: "Cooler CPU Cooler Master Hyper 212",
      preco: 199.9,
      Image:
        "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/r/r/rr-212s-25pz-r1.jpg",
      descricao:
        "Um dos coolers mais populares, oferece ótimo desempenho térmico com baixo ruído.",
    },
    {
      nome: "Mouse Gamer Logitech G203",
      preco: 159.9,
      Image:
        "https://images8.kabum.com.br/produtos/fotos/112948/mouse-gamer-logitech-g203-rgb-lightsync-6-botoes-8000-dpi-preto-910-005793_1612880277_gg.jpg",
      descricao:
        "Sensor preciso de 8000 DPI e iluminação RGB para jogabilidade fluida e estilosa.",
    },
    {
      nome: "Teclado Mecânico Redragon Kumara",
      preco: 229.9,
      Image:
        "https://images8.kabum.com.br/produtos/fotos/129688/teclado-mecanico-gamer-redragon-kumara-rgb-switch-outemu-blue-abnt2-branco-k552w-rgb-pt-blue-_1661259344_gg.jpg",
      descricao:
        "Teclado mecânico compacto com switches Outemu Blue e iluminação RGB vibrante.",
    },
    {
      nome: "Monitor Gamer AOC 24' 144Hz",
      preco: 999.9,
      Image:
        "https://http2.mlstatic.com/D_NQ_NP_990738-MLA82208796708_022025-O.webp",
      descricao:
        "Tela Full HD com 144Hz de taxa de atualização para uma experiência visual fluida.",
    },
    {
      nome: "Headset Gamer HyperX Cloud II",
      preco: 549.9,
      Image:
        "https://images0.kabum.com.br/produtos/fotos/461160/headset-gamer-hyperx-cloud-stinger-2-drivers-50mm-preto-519t1aa_1689972862_gg.jpg",
      descricao:
        "Som de alta qualidade com conforto prolongado para longas sessões de jogo.",
    },
    {
      nome: "Mousepad Gamer Redragon P003",
      preco: 59.9,
      Image:
        "https://images3.kabum.com.br/produtos/fotos/133483/mousepad-gamer-redragon-flicker-medio-320x270mm-speed-p030_1607622268_gg.jpg",
      descricao:
        "Superfície otimizada para movimentos rápidos e controle preciso do mouse.",
    },
    {
      nome: "Câmera Webcam Logitech C920e Full Hd",
      preco: 449.9,
      Image:
        "https://http2.mlstatic.com/D_NQ_NP_646215-MLU70026825035_062023-O.webp",
      descricao:
        "Webcam Full HD com microfone estéreo para chamadas e transmissões com qualidade profissional.",
    },
    {
      nome: "Cadeira Gamer ThunderX3",
      preco: 1399.9,
      Image:
        "https://images8.kabum.com.br/produtos/fotos/92008/92008_5_1526389239_gg.jpg",
      descricao:
        "Conforto ergonômico e design gamer para sessões prolongadas de uso.",
    },
    {
      nome: "Adaptador Wi-Fi USB TP-Link",
      preco: 89.9,
      Image:
        "https://images7.kabum.com.br/produtos/fotos/101797/adaptador-wireless-tp-link-usb-3-0-ac1300-archer-t3u_1557500267_gg.jpg",
      descricao:
        "Conectividade sem fio de alta velocidade com suporte a redes dual-band.",
    },
    {
      nome: "Fan RGB Cooler Master 120mm",
      preco: 69.9,
      Image:
        "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/f/mfl-b2dw-18npa-r14.jpg",
      descricao:
        "Ventoinha com iluminação RGB vibrante e excelente fluxo de ar para o gabinete.",
    },
    {
      nome: "Thermal Paste Arctic MX-4",
      preco: 39.9,
      Image:
        "https://http2.mlstatic.com/D_NQ_NP_831775-MLU74210718465_012024-O.webp",
      descricao:
        "Pasta térmica de alta performance para melhor dissipação de calor entre CPU e cooler.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Aqui você encontra de tudo para seu PC!</h1>
      </div>
      {produtosPC.map((produto, index) => (
        <div key={index} className={styles.card_produto}>
          <Link to="/details" state={produto} className={styles.container}>
            <img
              src={
                produto.Image ||
                "https://via.placeholder.com/150?text=Sem+Imagem"
              }
              alt={produto.nome}
              className={styles.imagem_produto}
            />

            <h3>{produto.nome}</h3>
            <p>
              {produto.preco != null
                ? `R$ ${produto.preco.toFixed(2)}`
                : "Preço indisponível"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;

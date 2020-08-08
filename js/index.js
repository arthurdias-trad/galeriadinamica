const APP_PIXABAY_API_KEY = ""; // Coloque aqui sua API do Pixabay
var termo = "";

$(document).ready(() => {
  const images = $("#images");
  const btnPesquisar = $("#pesquisar");
  const input = $("#texto-busca");
  const safeCheck = $("#safe");

  // AJAX;

  // const xhr = new XMLHttpRequest();
  // xhr.onload = () => {
  //   if (xhr.status >= 200 && xhr.status < 300) {
  //     $("#carregando").hide();
  //     let data = JSON.parse(xhr.response).hits;
  //     data.forEach((image) => {
  //       images.append(
  //         createCard(image.webformatURL, image.pageURL, image.user)
  //       );
  //     });
  //   } else {
  //     console.log("request failed");
  //   }
  // };

  // xhr.open(
  //   "GET",
  //   `https://pixabay.com/api/?key=${APP_PIXABAY_API_KEY}&q=${termo}&image_type=photo&orientation=horizontal&safesearch=${safeCheck.prop(
  //     "checked"
  //   )}`
  // );
  // xhr.send();

  // jQuery get
  // $.get(
  //   `https://pixabay.com/api/?key=${APP_PIXABAY_API_KEY}&q=${termo}&image_type=photo&orientation=horizontal&safesearch=${safeCheck.prop(
  //     "checked"
  //   )}`,
  //   (data) => {
  //     $("#carregando").hide();
  //     data.hits.slice(0, 12).forEach((image) => {
  //       images.append(
  //         createCard(image.webformatURL, image.pageURL, image.user)
  //       );
  //     });
  //   }
  // );

  // Fetch + .then()

  fetch(
    `https://pixabay.com/api/?key=${APP_PIXABAY_API_KEY}&q=${termo}&image_type=photo&orientation=horizontal&safesearch=${safeCheck.prop(
      "checked"
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      $("#carregando").hide();
      data.hits.slice(0, 15).forEach((image) => {
        images.append(
          createCard(image.webformatURL, image.pageURL, image.user)
        );
      });
    });

  btnPesquisar.on("click", async (e) => {
    e.preventDefault();
    termo = input.val();
    images.empty();
    $("#carregando").show();
    input.val("");
    let response = await fetch(
      `https://pixabay.com/api/?key=${APP_PIXABAY_API_KEY}&q=${termo}&image_type=photo&orientation=horizontal&safesearch=${safeCheck.prop(
        "checked"
      )}`
    );
    let data = await response.json();
    data.hits.slice(0, 15).forEach((image) => {
      $("#carregando").hide();
      images.append(createCard(image.webformatURL, image.pageURL, image.user));
    });
  });
});

// Funções complementares (com hoisting)
// Função retorna um cartão com as classes Bootstrap usando o link da imagem, nome do usuário e link para a a imagem no pixabay
function createCard(imgURL, linkURL, user) {
  return `
  <div class="col-sm-12 col-md-4 my-3">
    <div class="card">
      <div class="card-img-top">
        <img class="w-100" src=${imgURL} alt="Card image cap">
      </div>
    <div class="card-body">
      <h5 class="card-title">Foto de ${user}</h5>
      <a href=${linkURL} target='_blank' class="btn pixabay-btn">Veja  no Pixabay</a>
    </div>
  </div>
  `;
}

function form(selector) {
  const forms = document.querySelectorAll(selector),
    inputs = document.querySelectorAll("input");
  const message = {
    loading: "Загрузка...",
    success: "Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так...",
    emptyField: "Пожалуйста, заполните все поля",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const checkEmptyFields = (formData) => {
    for (const [name, value] of formData.entries()) {
      if (!value.trim()) {
        return true;
      }
    }
    return false;
  };

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.querySelector(".form__wrapper").appendChild(statusMessage);

      const formData = new FormData(form);

      if (checkEmptyFields(formData)) {
        statusMessage.textContent = message.emptyField;
        form.querySelectorAll("input, textarea, select").forEach((input) => {
          input.addEventListener("input", () => {
            if (statusMessage) {
              statusMessage.remove();
            }
          });
        });
        return;
      }

      postData("url/", formData)
        .then((res) => {
          console.log("Форма отправлена:", res);
          statusMessage.textContent = message.success;
        })
        .catch((err) => {
          console.error("Ошибка:", err);
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
}

export default form;

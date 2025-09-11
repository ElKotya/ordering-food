document.addEventListener('DOMContentLoaded', () => {

    let products = [
    {
      id: 0,
      preview: './images/1.svg',
      title: 'Устрицы по рокфеллеровски',
      description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
      price: 2700
    },
    {
      id: 1,
      preview: './images/2.svg',
      title: 'Свиные ребрышки на гриле с зеленью',
      description: 'Не следует, однако забывать, что реализация намеченных плановых',
      price: 1600
    },
    {
      id: 2,
      preview: './images/3.svg',
      title: 'Креветки по-королевски в лимонном соке',
      description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры обеспечивает широкому кругу',
      price: 1820
    },
    {
      id: 3,
      preview: './images/1.svg',
      title: 'Устрицы по рокфеллеровски',
      description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры ',
      price: 2700
    },
    {
      id: 4,
      preview: './images/1.svg',
      title: 'Устрицы по рокфеллеровски',
      description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
      price: 2700
    },
    {
      id: 5,
      preview: './images/2.svg',
      title: 'Свиные ребрышки на гриле с зеленью',
      description: 'Не следует, однако забывать, что реализация намеченных плановых',
      price: 1600
    },
    {
      id: 6,
      preview: './images/3.svg',
      title: 'Креветки по-королевски в лимонном соке',
      description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры обеспечивает широкому кругу',
      price: 1820
    },
    {
      id: 7,
      preview: './images/1.svg',
      title: 'Устрицы по рокфеллеровски',
      description: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры ',
      price: 2700
    }
  ]
  const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));

  if (!authorizedUser) {
    window.location.href = 'login.html';
  }

  const renderCounter = () => {
    const headerInner = document.querySelector('.header__inner-info');
    const basketCount = document.querySelector('.basket__count');
    const counter = authorizedUser.basket.reduce((acc, item) => {
      return {count: acc.count + item.count, price: acc.price + item.price * item.count};
    }, {count: 0, price: 0});
    headerInner.innerHTML = `
      ${counter.count} товара <br>
      на сумму ${counter.price} ₽
    `
    basketCount.innerHTML = counter.count;
  }
  renderCounter();
  const updateBasketCounter = (operation) => {
    const basketCount = document.querySelector('.basket__count');
    basketCount.innerHTML = operation === '+' ? Number(basketCount.innerHTML) + 1 : Number(basketCount.innerHTML) - 1;
    renderCounter();
  }

  const renderProducts = () => {
    const productsList = document.querySelector('.products-list');
    products.forEach((item) => {
      const newDiv = document.createElement('div');
      newDiv.className = 'products-card';
      newDiv.innerHTML = `
        <img src="${item.preview}" alt="" class="products-card__preview">
        <h2 class="products-card__title">
          ${item.title}
        </h2>
        <p class="products-card__description">
          ${item.description} 
        </p>
        <div class="products-card__bottom">
          <span class="products-card__bottom-price">
            ${item.price} ₽
          </span>
          <button class="products-card__bottom-btn" id="add-basket"></button>
        </div>
      `;
      newDiv.addEventListener('click', ({target}) => {
        const className = target.className;
        if (className === 'products-card__bottom-btn') {
          const findedItem = authorizedUser.basket.find((basketItem) => item.id === basketItem.id);
          if(!findedItem) {
            authorizedUser.basket.push({...item, count: 1});
          } else {
            findedItem.count += 1;
          }
          localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
          updateBasketCounter('+');
        }
      })
      productsList.append(newDiv);
      
    });
  }
  renderProducts();
  const removeElement = (el) => {
    el.remove();
  }
  const renderBasketList = () => {
    const basket = document.querySelector('.modal__inner-list');

    const list = authorizedUser.basket.map((item) => {
      const newDiv = document.createElement('div');
      newDiv.className = 'products-card';
      newDiv.innerHTML = `
        <img src="${item.preview}" alt="" class="products-card__preview">
        <h2 class="products-card__title">
          ${item.title}
        </h2>
        <p class="products-card__description">
          ${item.description} 
        </p>
        <div class="products-card__count card__count">
          <span class="card__count-minus" id="plus">-</span>
          <span class="card__count-result" id="count-product">${item.count}</span>
          <span class="card__count-plus" id="minus">+</span>
        </div>
        <div class="products-card__bottom">
          <span class="products-card__bottom-price">
            ${item.price * item.count} ₽
          </span>
          <button class="products-card__bottom-btn" id="remove-basket"></button>
        </div>
      `;

      newDiv.addEventListener('click', ({target}) => {
        const className = target.className;
        if (className === 'card__count-plus') {
          const findedItem = authorizedUser.basket.find((basketItem) => item.id === basketItem.id);
          
          findedItem.count += 1;
          target.parentNode.children[1].innerHTML = findedItem.count;
          target.parentNode.parentNode.children[4].children[0].innerHTML = item.price * findedItem.count + ' ₽';
          updateBasketCounter('+');
        } else if (className === 'card__count-minus') {
          const findedItem = authorizedUser.basket.find((basketItem) => item.id === basketItem.id);
          
          findedItem.count -= 1;
          updateBasketCounter('-');
          if (findedItem.count) {
            target.parentNode.children[1].innerHTML = findedItem.count;
            target.parentNode.parentNode.children[4].children[0].innerHTML = item.price * findedItem.count + ' ₽';
            
          } else {
            removeElement(target.parentNode.parentNode);
            authorizedUser.basket = authorizedUser.basket.filter((basketItem) => item.id !== basketItem.id)
          }
          
        } else if (className === 'products-card__bottom-btn') {
          removeElement(target.parentNode.parentNode);
          const filteredList = authorizedUser.basket.filter((el) => item.id !== el.id);
          authorizedUser.basket = filteredList;
          renderBasketList();
          renderCounter();
        }
        localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
        
      })
      return newDiv;
    });
    basket.replaceChildren(...list);
  }

  const modalButton = document.querySelector('.header__inner-basket');
  modalButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    renderBasketList();
    modal.classList.add('visible');
  })

  const modalCloseButton = document.querySelector('.modal__inner-close');
  modalCloseButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('visible');
  })

  document.querySelector('#signout').addEventListener('click', event => {
    localStorage.removeItem('authorizedUser');
    const updatedUsers = JSON.parse(localStorage.getItem('users'))
      .map((user) => user.userName === authorizedUser.userName ? authorizedUser : user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.location.href = 'login.html';
  })

})



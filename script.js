document.addEventListener('DOMContentLoaded', async () => {

let Titles = ['Cooper','Milo','Finn','Charlie','Tucker','Ollie','Bear','Jim','Luna','Lola'];
let Author = ['Liam','Noah','Mason','Jacob','William','Ethan','Michael','Alexander','James','Daniel'];
let Dates = ['21.10.25','20.10.25','19.10.25','18.10.25','17.10.25','16.10.25','15.10.25','14.10.25','13.10.25'];
  
setTimeout(function(){ document.querySelector(".preloader").remove();document.body.style.overflow = "visible"; }, 7000);

const Main = document.getElementById("main");

async function loadAndDisplayDogs(count = 5) {
    for (let i = 0; i < count; i++) {
            
        const dogImageUrl = await getDogImageUrl(); 
        const randomTitle = Math.floor(Math.random() * Titles.length);
        const randomAuthor = Math.floor(Math.random() * Author.length);
        const randomData= Math.floor(Math.random() * Dates.length);


        if (dogImageUrl) {
            let newImageElement = document.createElement("img");
            let ContentBox = document.createElement("div");
            let Text = document.createElement("p");
            let Title = document.createElement("h2");
            let Authors = document.createElement("h3");
            let Data = document.createElement("h4");
            let Nav = document.createElement("nav");
            Nav.classList.add("nav");
            let Sec1 = document.createElement("section");
            Sec1.classList.add("sec1");
            let Sec2 = document.createElement("section");
            Sec2.classList.add("sec2");
            let ButtonLike = document.createElement("button");
            ButtonLike.classList.add("like");
            let ButtonDisLike = document.createElement("button");
            ButtonDisLike.classList.add("dislike");
            let ButtonFavourite = document.createElement("button");
            ButtonFavourite.classList.add("favorite");
            let ButtonShare = document.createElement("button");
            ButtonShare.classList.add("share");
            Title.innerHTML = Titles[randomTitle];
            Text.innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde culpa ea, est sed, sint dolores repudiandae corrupti praesentium odio quos dignissimos molestias rem distinctio ipsam nostrum recusandae aliquid magni. Ullam?";
            Authors.innerHTML = Author[randomAuthor];
            Data.innerHTML = Dates[randomData];
            ContentBox.className = "ContentBox";
            newImageElement.id = "img"; 
            newImageElement.setAttribute("loading", "lazy");
                
            newImageElement.src = dogImageUrl;
            newImageElement.alt = `Фото собаки`;
            Sec1.appendChild(ButtonLike);
            Sec1.appendChild(ButtonDisLike);
            Sec2.appendChild(ButtonFavourite);
            Sec2.appendChild(ButtonShare);
            Nav.appendChild(Sec1);
            Nav.appendChild(Sec2)
            ContentBox.appendChild(newImageElement);
            ContentBox.appendChild(Title);
            ContentBox.appendChild(Text);
            ContentBox.appendChild(Authors);
            ContentBox.appendChild(Data);
            ContentBox.appendChild(Nav);
            Main.appendChild(ContentBox);
        } 
        else {
            console.log(`Не удалось загрузить фото`);
            }
        }
    }
    await loadAndDisplayDogs(5); 

    const observer = new IntersectionObserver( async (entries) => { 
    for (const entry of entries) {
        if (entry.isIntersecting) {
            const currentLastChild = document.getElementById("main").lastChild;
            if (currentLastChild && entry.target === currentLastChild) { 
                await loadAndDisplayDogs(1); 
                observer.unobserve(currentLastChild);
                const newLastChild = document.getElementById("main").lastChild;
                if (newLastChild) {
                    observer.observe(newLastChild);
                }
            }
        }
    }
    }, 
    {
        root: null, 
        threshold: 0.1 
    });

    const initialLastChild = document.getElementById("main").lastChild;
    if (initialLastChild) {
        observer.observe(initialLastChild);
    }
    
});

async function getDogImageUrl() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 'success' && data.message) {
            return data.message;
        } else {
            console.error("Не удалось получить URL фото.");
            return null;
        }
    } catch (error) {
        console.error("Ошибка при получении фото:", error);
        return null;
    }
}
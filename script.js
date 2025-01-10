// 作品数据示例
const works = [
    {
        id: 1,
        title: 'G-1',
        image: './images/cyber-motorcycle.jpg',
        description: 'Futuristic concept motorcycle design'
    },
    {
        id: 2,
        title: 'G-1 Concept',
        image: './images/design.jpg',
        description: 'Futuristic motorcycle design development'
    },
    {
        id: 3,
        title: 'YUN DU',
        image: './images/YUN DU.jpg',
        description: 'Cloud City concept design'
    },
    {
        id: 4,
        title: 'Wind City Presentation',
        image: './images/WIND CITY_PRESENTATION.jpg',
        description: 'Future wind-powered city master planning presentation'
    },
    {
        id: 5,
        title: 'Wind City shot 1',
        image: './images/WIND CITY_1.jpg',
        description: 'Wind City architectural complex perspective'
    },
    {
        id: 6,
        title: 'Wind City shot 2',
        image: './images/WIND CITY_2.jpg',
        description: 'Wind City core area showcase'
    },
    {
        id: 7,
        title: 'Wind City shot 3',
        image: './images/WIND CITY_3.jpg',
        description: 'Wind City ecosystem presentation'
    },
    {
        id: 8,
        title: 'The Sanctuary of the Deities Thumbnails',
        image: './images/The Sanctuary of the Deities Thumbnails.jpg',
        description: 'The Sanctuary of the Deities - Environment thumbnails'
    },
    {
        id: 9,
        title: 'The Sanctuary of the Deities Shot1',
        image: './images/The Sanctuary of the Deities Shot1.jpg',
        description: 'The Sanctuary of the Deities - Scene 1'
    },
    {
        id: 10,
        title: 'The Sanctuary of the Deities Shot2',
        image: './images/The Sanctuary of the Deities Shot2.jpg',
        description: 'The Sanctuary of the Deities - Scene 2'
    },
    {
        id: 11,
        title: 'The Sanctuary of the Deities Shot3',
        image: './images/The Sanctuary of the Deities Shot3.jpg',
        description: 'The Sanctuary of the Deities - Scene 3'
    },
    {
        id: 12,
        title: 'Frontier',
        image: './images/Frontier.jpg',
        description: 'Frontier Exploration'
    },
    {
        id: 13,
        title: 'Sonma',
        image: './images/Sonma.jpg',
        description: 'Sonma - Character concept overview'
    },
    {
        id: 14,
        title: 'Sonam Sketch',
        image: './images/Sonam Sketch.jpg',
        description: 'Sonam - Character Thumbnail'
    },
    {
        id: 15,
        title: 'Sonam_Portait Exploration',
        image: './images/Sonam_Portait Exploration.jpg',
        description: 'Sonam - Portrait exploration'
    },
    {
        id: 16,
        title: 'Sonam_Props',
        image: './images/Sonam_Props.jpg',
        description: 'Sonam - Props design'
    },
    {
        id: 17,
        title: 'Girl with Dragon',
        image: './images/Girl with Dragon_illustration.jpg',
        description: 'Digital illustration exploring the mystical connection between a young girl and her dragon companion.'
    },
    {
        id: 18,
        title: 'Lost Under',
        image: './images/Lost Under.jpg',
        description: 'Environmental concept art depicting the climactic moment of the story.'
    },
    {
        id: 19,
        title: 'Lost Under - The End',
        image: './images/Lost Under_End.jpg',
        description: 'The final chapter of the Lost Under series, showcasing the ending of the story.'
    }
];

// 添加当前图片索引变量
let currentImageIndex = 0;

// 动态加载作品
function loadWorks() {
    const gallery = document.querySelector('.gallery-grid');
    
    works.forEach((work, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in';
        
        item.innerHTML = `
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
                 data-src="${work.image}" 
                 alt="${work.title}"
                 loading="lazy"
                 class="lazy"
                 onerror="this.style.backgroundColor='rgba(255,0,0,0.2)'"
                 onload="console.log('图片加载成功:', this.src)">
            <div class="gallery-item-title">${work.title}</div>
        `;
        
        // 修改点击事件，传入索引
        item.addEventListener('click', () => {
            openModal(work.image, work.title, work.description, index);
        });
        
        gallery.appendChild(item);
    });

    // 添加懒加载观察器
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// 添加模态框功能
function openModal(imageSrc, title, description, index) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.querySelector('.modal-caption');
    
    currentImageIndex = index;
    
    // 优化打开动画
    modalImg.style.opacity = '0';
    modalImg.style.transform = 'scale(0.95)';
    
    requestAnimationFrame(() => {
        modalImg.src = imageSrc;
        caption.textContent = `${title} - ${description}`;
        modal.classList.add('show');
        
        requestAnimationFrame(() => {
            modalImg.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        });
    });
    
    document.body.style.overflow = 'hidden';
    updateNavigationButtons();
}

// 添加导航函数
function navigateImage(direction) {
    const newIndex = currentImageIndex + direction;
    
    if (newIndex >= 0 && newIndex < works.length) {
        const work = works[newIndex];
        currentImageIndex = newIndex;
        
        const modalImg = document.getElementById('modalImage');
        const caption = document.querySelector('.modal-caption');
        
        // 优化切换动画
        modalImg.style.opacity = '0';
        modalImg.style.transform = direction > 0 ? 'translateX(50px)' : 'translateX(-50px)';
        
        setTimeout(() => {
            modalImg.src = work.image;
            caption.textContent = `${work.title} - ${work.description}`;
            
            requestAnimationFrame(() => {
                modalImg.style.opacity = '1';
                modalImg.style.transform = 'translateX(0)';
            });
        }, 200);
        
        updateNavigationButtons();
    }
}

// 更新导航按钮状态
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentImageIndex === works.length - 1 ? 'none' : 'block';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadWorks();
    
    // 添加关闭模态框的事件监听
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('imageModal').addEventListener('click', (e) => {
        if (e.target.id === 'imageModal') {
            closeModal();
        }
    });
    
    // 添加键盘事件（按ESC键关闭模态框）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    // 添加导航按钮事件监听
    document.getElementById('prevButton').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage(-1);
    });
    
    document.getElementById('nextButton').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage(1);
    });
    
    // 添加键盘左右键导航
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('imageModal').classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
    });

    // 社交媒体图标切换
    const socialToggle = document.getElementById('socialToggle');
    const socialIcons = document.querySelector('.social-icons');
    
    socialToggle.addEventListener('click', () => {
        socialToggle.classList.toggle('active');
        socialIcons.classList.toggle('active');
    });
}); 
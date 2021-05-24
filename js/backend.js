
const logoutBtn = document.querySelector('.logout');
const productList = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');
const productListBtn = document.querySelector('#productListBtn');
const userName = getUserName();
const apiPath = userName.split('@')[0];
const token = JSON.parse(localStorage.getItem(userName));
const api = {
    logout: 'https://vue3-course-api.hexschool.io/logout',
    getAllProduct: `https://vue3-course-api.hexschool.io/api/${apiPath}/admin/products/all`,
    delProduct: `https://vue3-course-api.hexschool.io/api/${apiPath}/admin/product/` // 需補上:product_id 
}
const header = {
    Authorization: token
}
let productData = {};
function getUserName(){
    return window.location.search.split('=')[1]
}
function render(){
    let str = '';
    let quantity = Object.keys(productData).length;
    let list =  Object.keys(productData);
    list.forEach((key)=>{
       str += `<tr>
                <td>${productData[key].title}</td>
                <td width="120">
                    ${productData[key].origin_price}
                </td>
                <td width="120">
                    ${productData[key].price}
                </td>
                <td width="100">
                    <span class="">${ productData[key].is_enabled === 1 ? '啟用': '未啟用'}</span>
                </td>
                <td width="120">
                    <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id='${productData[key].id}'> 刪除 </button>
                </td>
            </tr>`;
    })

    productList.innerHTML = str;
    productCount.textContent = quantity;
    
}

function getProduct(){
    axios.get(api.getAllProduct, { headers: header })
        .then((res) => {
            productData = res.data.products;
            console.log(res.data);
            render();
        })
        .then(()=>{
            let deleteBtnList = document.querySelectorAll('.deleteBtn');
            // console.log(deleteBtnList);
            deleteBtnList.forEach((item)=>{
                item.addEventListener('click', (e)=>{
                    let delApi = api.delProduct + e.target.getAttribute('data-id');
                    // console.log(delApi);
                    axios.delete(delApi, { headers: header })
                        .then((res)=>{
                            console.log(res.data);
                            getProduct();
                        })
                })
            })
        })
}
function logout(userName){
    localStorage.removeItem(userName);
    window.location.href = 'index.html';
}
function init(){
    getProduct();
    logoutBtn.addEventListener('click', (e) => {
        axios.post(api.logout)
            .then((res)=>{
                console.log(res.data.message);
                logout(userName);
            })
    })
    productListBtn.addEventListener('click', (e) => {
        let link = window.location.pathname + window.location.search;
        // console.log(link);
        productListBtn.setAttribute('href', link);
    })
    // window.onunload = logout();
}


init();

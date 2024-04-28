const BackgroundWeather = (iconCode) => {

    // const weatherData = await fetchWeather()
    // console.log(weatherData());

    const backgroundImage = {
        //dia
        '01d': 'https://watv.org/wp-content/uploads/2020/06/good-weather.jpg',
        '02d': 'https://p1.pxfuel.com/preview/844/761/114/sky-blue-wide-blue-sky.jpg',
        '03d': 'https://programacion.net/files/article/article_02035_.jpg',
        '04d': 'https://fotos.perfil.com/2022/02/18/trim/1280/720/1802cielo-1314788.jpg',
        '09d': 'https://miro.medium.com/v2/resize:fit:900/1*FJzTpQjyQbjF3xCy3UdmfA.png',
        '10d': 'https://i.pinimg.com/236x/3e/57/a2/3e57a2607133a29bb7a826135062a95c.jpg',
        '11d': 'https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=1200',
        '13d': 'https://c4.wallpaperflare.com/wallpaper/160/111/725/animales-felino-gato-nieve-wallpaper-preview.jpg',
        '50d': 'https://img.freepik.com/fotos-premium/bosque-coniferas-fisuras-niebla-fondo-pantalla-hd-8k-imagen-fotografica_973183-3814.jpg',
        //noche
        '01n': 'https://img.freepik.com/vector-gratis/paisaje-pantano-noche_1110-772.jpg?size=626&ext=jpg',
        '02n': 'https://img.freepik.com/vector-gratis/diseno-plano-agricultura-ecologica-fondo-noche_52683-77146.jpg?w=1800&t=st=1699387270~exp=1699387870~hmac=26b394cc3db53f4ccded4b38c8162644ce5803158a530a95e7e376a390b40038',
        '03n': 'https://img.freepik.com/vector-gratis/paisaje-mar-nocturno-costa-luna-cielo_107791-1664.jpg?w=1480&t=st=1699387375~exp=1699387975~hmac=27014e977ae68f5db51f9f87f520b1526afefd8bf4e869548e817f55dca38674',
        '04n': 'https://img.freepik.com/vector-gratis/fondo-purpura-cielo-nublado-tarde-grupo-cumulos-nubes-cirros-ilustracion-dibujos-animados-plana_1284-62768.jpg?w=1380&t=st=1699387542~exp=1699388142~hmac=b9e72b55d6c328d424dd9b4302afd11d3eb89f767f2f6ca1fc3172c80b6bfc5f',
        '09n': 'https://img.freepik.com/foto-gratis/paisaje-urbano-cyberpunk_23-2150712468.jpg?w=1480&t=st=1699387795~exp=1699388395~hmac=bddbffad6d6a9683be92a98cb2f6ab82bc426692cdc4789e2f35f3e22cbe1306',
        '10n': 'https://img.freepik.com/foto-gratis/luces-borrosas-automovil-mojado-interior-automovil_181624-586.jpg?w=1380&t=st=1699387988~exp=1699388588~hmac=d7d8c5239ca100f28ef4778a637f63e1735e4ff93890f33aceebd46befe9117b',
        '11n': 'https://img.freepik.com/foto-gratis/tormenta-mar-sol-que-aparece-detras-nubes_1150-18316.jpg?w=1380&t=st=1699388054~exp=1699388654~hmac=d5d7f14680df60b91f5bf11405e105c2c07fbb93423f8ed1762a1643e22810c5',
        '13n': 'https://img.freepik.com/foto-gratis/paisaje-arbol-nevado-3d_1048-9670.jpg?w=1060&t=st=1699388197~exp=1699388797~hmac=0d69d7ddda5cda58027c67f735326b59e7af93b4d936b8b03ea9ab693a585d54',
        '50n': 'https://img.freepik.com/vector-gratis/3d-ilustracion-realista-niebla-niebla-gris-o-humo-cigarrillo_33099-754.jpg?w=1380&t=st=1699388234~exp=1699388834~hmac=cad07dd57d59899e8f37c119d4ed720199efb59bd446cdcf18cfc40e9550dfdc',
    }

    const backgroundImageURL = backgroundImage[iconCode] || 'https://programacion.net/files/article/article_02035_.jpg';

    return backgroundImageURL;
}

export default BackgroundWeather
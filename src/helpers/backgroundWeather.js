const BackgroundWeather = (iconCode) => {

    // const weatherData = await fetchWeather()
    // console.log(weatherData());

    const backgroundImage = {
        //dia
        '01d': 'https://img.freepik.com/vector-gratis/fondo-luz-dia-nublado-azul-diseno-tiempo_33099-512.jpg?size=626&ext=jpg',
        '02d': 'https://img.freepik.com/foto-gratis/cielo-morado-rosa-nubes-pajaros-volando-cielo_1340-35232.jpg?size=626&ext=jpg',
        '03d': 'https://programacion.net/files/article/article_02035_.jpg',
        '09d': 'https://img.freepik.com/foto-gratis/ciudad-noche-traves-ventana-gotas-lluvia_53876-128778.jpg?w=1380&t=st=1699387749~exp=1699388349~hmac=6fc95c4138e4e465a3f49d0f354bdb025325915877a91779eef23cb017eba125',
        '10d': 'https://i.pinimg.com/236x/3e/57/a2/3e57a2607133a29bb7a826135062a95c.jpg',
        '11d': 'https://img.freepik.com/foto-gratis/composicion-efectos-meteorologicos_23-2149853316.jpg?w=1380&t=st=1699388097~exp=1699388697~hmac=755c09078bce9df84c5e40ad9dc09810939b32a68955a673fd2a627179c60b07',
        '13d': 'https://img.freepik.com/foto-gratis/paisaje-invierno-cubierto-nieve-3d_1048-11056.jpg?w=826&t=st=1699388156~exp=1699388756~hmac=a0f64666db2a1df8e2232b2b48f40149123c8cd36afb64250e166a84d9f2cc23',
        '50d': 'https://img.freepik.com/foto-gratis/hermosa-vista-rural-arboles_23-2149125559.jpg?w=740&t=st=1699388281~exp=1699388881~hmac=89fbf5e2525d8697f80b63a2c90915a21bf36aa6d0374975fab7cc72aa4dbaac',
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

    const backgroundImageURL = backgroundImage[iconCode] || '/public/nubes.png';

    return backgroundImageURL;
}

export default BackgroundWeather
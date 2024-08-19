import { fetchCoords } from '../api/fetchData.js';

class Map {
  constructor($parent, { address, info } = {}) {
    this.$parent = $parent;
    this.address = address;
    this.info = info;

    this.init();
  }

  template() {
    const $mapCon = document.createElement('div');
    $mapCon.classList.add('mapCon');

    this.$parent.appendChild($mapCon);

    this.$mapCon = $mapCon;
  }

  async renderMap() {
    try {
      const [x, y] = await fetchCoords(this.address);

      const position = new kakao.maps.LatLng(y, x);
      const options = {
        center: position,
        level: 3,
      };

      // 지도 생성
      const map = new kakao.maps.Map(this.$mapCon, options);
      // 마커 생성
      const marker = new kakao.maps.Marker({
        position,
      });
      // 인포윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div class='mapInfo'>${this.info}</div>`,
      });

      marker.setMap(map);
      infowindow.open(map, marker);
      map.setCenter(position);
      map.setDraggable(false);

      kakao.maps.event.addListener(map, 'zoom_changed', function () {
        map.setCenter(marker.getPosition());
      });
    } catch (err) {
      console.error(err);
    }
  }

  init() {
    this.template();
    this.renderMap();
  }
}

export default Map;

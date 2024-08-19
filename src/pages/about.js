class About {
  constructor($container) {
    this.$container = $container;

    this.init();
  }

  setState() {}

  template() {
    this.$container.innerHTML = `
      <section class='aPage sec01'>
        <h2>[FE1] 9조 - 김현석</h2>
        <div class='inner'>
          <div>
            <h3>웹 사이트 제작 목적</h3>
            <span>
              보호, 공고 중인 유기동물들의 정보를 제공하는 사이트 입니다.
            </span>
            <span>사용자는 다음과 같은 기능들을 이용할 수 있습니다.</span></br>
            <span>1. 공고기간이 얼마 남지 않은 유기동물의 정보를 우선 적으로 조회가 가능합니다.</span>
            <span>2. 필터 기능을 통하여 조건부 검색(지역, 축종, 품종)이 가능합니다.</span>
            <span>3. 해당 유기 동물의 자세한 정보와 보호위치를 지도에 표시에 줍니다.</span>
          </div>
          <div>
            <h3>핵심 서비스</h3>
            <span>1. 공고기간이 얼마 남지 않은 유기동물의 정보를 우선 적으로 조회가 가능합니다.</span>
            <span>2. 필터 기능을 통하여 조건부 검색(지역, 축종, 품종)이 가능합니다.</span>
            <span>3. 해당 유기 동물의 자세한 정보와 보호위치를 지도에 표시에 줍니다.</span>
          </div>
          <div>
            <h3>활용 API</h3>
            <p>국가동물보호정보시스템 구조동물 조회 서비스</p>
            <a href='https://www.data.go.kr/data/15098931/openapi.do'>https://www.data.go.kr/data/15098931/openapi.do</a>
          </div>
        </div>
      </section>
    `;
  }

  init() {
    this.template();
  }
}

export default About;

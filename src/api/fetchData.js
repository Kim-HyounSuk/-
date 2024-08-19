export const fetchData = async ({
  pathname,
  upkind,
  sido,
  sigungu,
  endde,
  pageNo,
  up_kind_cd,
  kind,
  upr_cd,
  org_cd,
  numOfRows,
  state,
  care_reg_no,
} = {}) => {
  const url = new URL('http://apis.data.go.kr/1543061/abandonmentPublicSrvc');

  if (pathname) url.pathname += pathname;
  if (up_kind_cd) url.searchParams.set('up_kind_cd', up_kind_cd);
  if (upr_cd) url.searchParams.set('upr_cd', upr_cd);
  if (org_cd) url.searchParams.set('org_cd', org_cd);
  if (upkind) url.searchParams.set('upkind', upkind);
  if (kind) url.searchParams.set('kind', kind);
  if (sido) url.searchParams.set('upr_cd', sido);
  if (sigungu) url.searchParams.set('org_cd', sigungu);
  if (endde) url.searchParams.set('endde', endde);
  if (pageNo) url.searchParams.set('pageNo', pageNo);
  if (numOfRows) url.searchParams.set('numOfRows', numOfRows);
  if (state) url.searchParams.set('state', state);
  if (care_reg_no) url.searchParams.set('care_reg_no', care_reg_no);

  url.searchParams.set('serviceKey', import.meta.env.VITE_API_KEY);
  url.searchParams.set('_type', 'json');

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCoords = async (address) => {
  const url = new URL('https://dapi.kakao.com/v2/local/search/address');

  url.searchParams.set('query', address);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
      },
    });
    const data = await res.json();
    const { x, y } = data.documents[0];

    return [x, y];
  } catch (err) {
    console.error(err);
  }
};

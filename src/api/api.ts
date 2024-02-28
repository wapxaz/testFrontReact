import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.chucknorris.io/jokes/",
});

export type ResponseDateType = {
  total: number;
  result: Array<ResultResponseDateType>;
};
export type ResultResponseDateType = {
  categories: Array<string>;
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

// привожу дату к формату дд.мм.гггг
function changeFormatDate(date: string) {
  let timestamp = Date.parse(date);
  let d = new Date();
  d.setTime(timestamp);
  return (
    ("0" + d.getDate()).slice(-2) +
    "." +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "." +
    d.getFullYear()
  );
}

export const API = {
  // поиск
  search(searchStr: string) {
    return instance
      .get<ResponseDateType>(`search?query=${searchStr}`)
      .then((data) => {
        return {
          total: data.data.total,
          result: data.data.result.map((el) => ({
            date: changeFormatDate(el.created_at), //el.created_at,
            id: el.id,
            url: el.url,
            text: el.value,
          })),
        };
      });
  },
};

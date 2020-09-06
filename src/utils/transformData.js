const transformData = function(data) {
  let str = "";
  for (let key in data) {
    str = str + `${key}=${data[key]}&`;
  }

  return str.replace(/&$/, "");
};

/*
 * 1.在一个文件或模块中，export、import可以有多个，export default仅有一个
 * 2.通过export方式导出，在导入时要加{ }，export default则不需要
 * */
export default transformData;

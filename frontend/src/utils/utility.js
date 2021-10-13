import moment from "moment";

const getProperImagePath = (imagePath) => {
    // console.log(imagePath)
    let tempImagePath = "";
    if (imagePath[1] === "f") {
      for (let i = 24; i < imagePath.length; i++) {
        tempImagePath += imagePath[i];
      }
      return `/images/${tempImagePath}`;
    } else {
      return imagePath;
    }
  };


const formateDate = (date) => {
    return moment(date).format('DD MMM, YYYY');
  }

export {getProperImagePath, formateDate};


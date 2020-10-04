var image = "0";
function uploadImg(){
    erase();
    const img2 = document.getElementById("canvasimg");
    const upload = document.getElementById("upload").files[0];
    let reader = new FileReader();
        reader.readAsDataURL(upload);
        reader.onload = function (e) {
            image = reader.result;
            img2.style.display = "block";
            img2.setAttribute("src",reader.result);
            img2.style.top = "18%";
            img2.style.left = "10%";
            img2.style.width = "405px";
            img2.style.height = "305px";
          }
    // ctx.drawImage(image, 10, 10);
    
    console.log(image);
    console.log(upload);

}  

// for checking canvas is blonk or not
function isCanvasBlank(canvas) {
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
  } 


function saveImage() {
    const canvas = document.getElementById('can');
    const img = document.getElementById("canvasimg2");
      if (isCanvasBlank(canvas)){
        var canvasData = "0";
    }
      else{
        var canvasData = canvas.toDataURL("image/jpeg");
      }
    // console.log(canvasData)
    if ((canvasData=="0")&&(image=="0")){
        alert("you are not draw digit or upload image");
    }else{
      $("#loading").show();
      $.ajax({
        type: "POST",
        url: "/result/",
				async: true,
        data: {
          'imgData':canvasData ,
          'imageData':image
        },
        success: function (data) {
            if (image!="0"){
            img.style.display="block";
            img.setAttribute("src",`static/image/digit${data}.jpg`);
            img.style.top = "18%";
            img.style.left = "50%";
            img.style.width = "405px";
            img.style.height = "305px";
        }else if(canvasData!="0"){
            img.style.display="block";
            img.setAttribute("src",`static/image/digit${data}.jpg`)
            img.style.top = "20%";
            img.style.left = "51%";
            img.style.width = "390px";
            img.style.height = "290px";

        }
        $("#loading").hide();
        }
      });
    }
      return false;
    }

    //function saveImage() {
//       console.log("testing");
      
//       const canvas = document.getElementById('can');
//       const canvasData = canvas.toDataURL();
//       const img = document.getElementById("canvasimg2");
//     //   const formData = new formData();
//     //   formData.append("imgData",canvasData);
//       const ajax = new XMLHttpRequest();
//       ajax.onreadystatechange=function(){
//                 if (ajax.readyState==4 && ajax.status==200){
//                     img.style.display="block";
//                     // alert("data:image/png;base64,"+ajax.responseText);
//                     img.setAttribute("src","data:image/png;base64,"+ajax.responseText);
//                 }
//                 else if (ajax.status === 404) {  
//                     alert("error");
//                 }  
//                 else if (ajax.status === 403) {  
//                     alert("error 403");
//                 }  
//             }
//         const csrf = '{{csrf_token}} ';
//         console.log(csrf);
//         const url = `/result/`;
//         let data = JSON.stringify({"imag":"image","imgData":canvasData});
//         ajax.open("POST", url, true);
//         ajax.setRequestHeader('X-CSRF-Token', csrf);
//         ajax.setRequestHeader('Content-Type', 'application/json');
//         ajax.send(data);
//         // ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//         // ajax.send("fname=Henry&lname=Ford");
// }
//adding navbar dynamically by determining number of sections
let htmlToAdd=`<ul id="navbar__list">\n`; //the beginning of the html that i will add
let numOfSections = document.querySelectorAll(".landing__container").length; //determining number of sections
 for(i=0;i<numOfSections;i++) //loop that adds section html to the html variable i declared before
 {
     if(i===0)
     htmlToAdd+=` <li class="nav_item${(i+1).toString()} active">Section${(i+1).toString()}</li>\n`;
     else
     htmlToAdd+=` <li class="nav_item${(i+1).toString()}">Section${(i+1).toString()}</li>\n`;
 }
 htmlToAdd+=`</ul>\n`; //the end of the html that iam going to add
document.querySelector(".navbar__menu").innerHTML+=htmlToAdd;//adding html in the position i want

function absolute(Num)//this function just returns the absolute of any number
{
    if(Num<0)
    {
        Num*=-1;
    }
    return Num;
}
function elementRectTop(eleId)//this function returns the top of bounding element
{
    return document.querySelector(eleId).getBoundingClientRect().top;
}
//determining which section iam in
document.addEventListener("scroll",function()
{
    //initializing variables
    /*
    after trying around i found that the section that iam in 
    is always the one whose top is closest to zero, that's why
    i got the absolute of all Tops so that i can easilly 
    determine which one is closest to zero by checking the 
    Lowest Top
    */
    let SectionTop=elementRectTop("#section1"),CheckTop=0;
    SectionTop=absolute(SectionTop);
    let sectionNum=0;
    for(i=0;i<numOfSections;i++)
    {
        CheckTop=elementRectTop(`#section${(i+1).toString()}`);
        CheckTop=absolute(CheckTop);
        if(SectionTop>CheckTop)
        {
            SectionTop=CheckTop;
            sectionNum=i;//getting index of my section
        }
    }
        /*
        changing classes so that the css stylesheet will 
        automatically change the style of the active section 
        class
        */ 
        let oldEleAct=document.querySelector(".your-active-class");
        let eleAct=document.querySelector(`#section${(sectionNum+1).toString()}`);
        if(oldEleAct!=eleAct)
        {
            oldEleAct.classList.remove("your-active-class");
            eleAct.classList.add("your-active-class");
            oldEleAct=document.querySelector(".active");
            eleAct=document.querySelector(`.nav_item${(sectionNum+1).toString()}`);
            oldEleAct.classList.remove("active");
            eleAct.classList.add("active");
        }
})
document.querySelector(`.page__header`).scrollIntoView();//just to make sure that the page always loads on top
//clicking to section from navbar
function scroll_to (ind)
{
    document.querySelector(".nav_item" +(ind+1)).addEventListener("click",function()
    {
        document.querySelector(`#section${(ind+1).toString()}`).scrollIntoView();
    });
    return 1;
}
for(i=0;i<numOfSections;i++)
{
    scroll_to(i);
}


// תפיסת אלמנטים
const name = document.querySelector("#name");
const age = document.querySelector("#age");
const salary = document.querySelector("#salary");
const tbody = document.querySelector("tbody");
const add_btn = document.querySelector("#add_btn");

// פונקציה ששמורת בלוקל סטורג מקבלת מפתח וערכים
const saveToLS = (key, values) => {
    const data = JSON.stringify(values);
    localStorage.setItem(key, data);
};

// פונקציה שמביאה מידע מהלוקל סטורג לפי מפתח שהיא מקבלת
const loadFromLS = (key) => {
    const response = localStorage.getItem(key);
    const data = JSON.parse(response);
    return data;
};

// משתנה שמכיל את המספר הרישומי של המועסק שנוסף
// בהתחלה הוא אפס, אחר כך הוא המידע שקיים בלוקל סטורג
let num = loadFromLS("num") ? loadFromLS("num") : 0;

// משתנה שהוא מערך שמכיל את כל המועסקים בתור התחלה הוא אפס אחר כך הוא מה שיש בלוקל סטורג
let employes = loadFromLS("employes") ? loadFromLS("employes") : [];

// פונקציה שמקבלת אובייקט ובונה ממנו שוררה בטבלה
const loadTdTohtml = (item) => {

    // יצירת אלמנט אבא - שורה בטבלה
    const tr = document.createElement("tr");

    // יצרה של תאי מידע והזנת תוכן
    const td_num = document.createElement("td");
    td_num.innerHTML = item.num;
    const td_name = document.createElement("td");
    td_name.innerHTML = item.name;
    const td_age = document.createElement("td");
    td_age.innerHTML = item.age;
    const td_salary = document.createElement("td");
    td_salary.innerHTML = item.salary;
    const td_action_delete = document.createElement("td");
    td_action_delete.innerHTML = `<button class="btn">🗑️</button>`;

    // האזנה לקליק על כפתור מחיקה
    td_action_delete.addEventListener("click", () => {
        // הסרת של אלמנט של השורה מהטבלה בדף
        tr.remove();

        // עדכון של המערך במילים אחרות מחיקה של השורה הזו מהמערך
        employes = employes.filter(emp => emp.num !== item.num);

        // מעדכן את המערך המעודכן בלוקל סטורג
        saveToLS("employes", employes);

    })

    // הופעה של התאים בתוך השורה
    tr.append(td_num, td_name, td_age, td_salary, td_action_delete);

    // הופעה של השורה בתוך הטבלה
    tbody.append(tr);

}

// לולאה שרצה על המערך בטעינה הראשית וקוראת לפונקציה שיוצרת שורה בטבלה
for (let emp of employes) {
    loadTdTohtml(emp);
}


// מאזין לקליק על הוספת שורה
add_btn.addEventListener("click", () => {

    // קידום של נאמ ב1
    num++;
    // שמירה של נאמ בלוקל סטורג
    saveToLS("num", num);

    // יצירת אובייקט עם תכונות שמושטטות על הערכים מהאינפוטים
    const employee = {
        num: num,
        name: name.value,
        age: age.value,
        salary: salary.value,
    }

    // עדכון של המערך של המועסקים עם האובייקט החדש שיצרנו
    employes.push(employee);

    // מעדכן את המערך המעודכן בלוקל סטורג
    saveToLS("employes", employes);

    // קריאה לפונקציה שיוצרת שורה בטבלה
    loadTdTohtml(employee);

    // איפוס האינפוטים בדף 
    name.value = "";
    age.value = "";
    salary.value = "";

})

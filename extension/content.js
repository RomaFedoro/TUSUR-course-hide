"use strict";
const coursesList = [];
let hiddenCourses = getHiddenCourses();

function getHiddenCourses() {
    const item = localStorage.getItem("course");
    return item === null ? [] : JSON.parse(item);
}

function app() {
    const coursesNode = document.querySelector(".courses");
    const courseNodeList = coursesNode.querySelectorAll(".coursebox");

    for (let course of courseNodeList) {
        const courseId = course.dataset.courseid;
        coursesList.push(courseId);

        addHideCheckbox(course, hiddenCourses);

        // Rearange & Add Style
        course.classList.remove("odd", "even", "first");
        if (hiddenCourses.includes(courseId)) {
            course.classList.add("ch_hidden_course");
            coursesNode.appendChild(course);
        }
    }
}

const getCourseNode = (courseId) =>
    document.querySelector(`.coursebox[data-courseid="${courseId}"]`);

const updateLocalStorage = (entries) =>
    localStorage.setItem("course", JSON.stringify(entries));

function addHideCheckbox(node) {
    const courseId = node.dataset.courseid;

    const label = document.createElement("label");
    label.classList.add("ch_checkbox");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = courseId;
    checkbox.checked = hiddenCourses.includes(courseId);

    if (checkbox.checked) label.classList.add("ch_checkbox_active");

    checkbox.addEventListener("input", function () {
        let updatedHiddenCourses;

        if (this.checked) {
            updatedHiddenCourses = [...hiddenCourses, courseId];
            node.classList.add("ch_hidden_course");
            label.classList.add("ch_checkbox_active");
        } else {
            updatedHiddenCourses = hiddenCourses.filter(
                (el) => el !== courseId
            );
            node.classList.remove("ch_hidden_course");
            label.classList.remove("ch_checkbox_active");
        }

        updateLocalStorage(updatedHiddenCourses);
        hiddenCourses = updatedHiddenCourses;
    });

    label.appendChild(checkbox);
    node.appendChild(label);
}

document.addEventListener("DOMContentLoaded", app);

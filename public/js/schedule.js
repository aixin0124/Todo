document.addEventListener('DOMContentLoaded', function() {
    const courseSchedule = {
        1: [
            { time: "08:10-09:40", name: "web", teacher: "段佳腾", location: "八教504" },
            { time: "10:00-12:20", name: "区块导论", teacher: "段佳腾", location: "九教623" }
        ],
        2: [
            { time: "10:00-11:30", name: "大数据哦", teacher: "郭小角", location: "九教620" },
            { time: "14:00-15:30", name: "web双", teacher: "段佳腾", location: "八教503" }
        ],
        3: [
            { time: "08:10-11:30", name: "软件工程", teacher: "徐怀胜", location: "九教622" },
            { time: "15:50-16:30", name: "大数据", teacher: "郭小角", location: "八教504" },
            { time: "20:00-21:30", name: "形式-7", teacher: "杨晓玲", location: "八教301" }
            
        ],
        4: [
            { time: "08:10-09:40", name: "职业8周", teacher: "段佳腾", location: " 九教619" },
            { time: "10:00-11:30", name: "区块后端", teacher: "曾洁波", location: "九教509" }
        ],
        5: [
            { time: "10:00-11:30", name: "区块后端", teacher: "曾洁波", location: "九教509" }
        ]
    };
    const dayTitles = {
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五"
    };
    const daySelector = document.getElementById('day-selector');
    const dayItems = daySelector.querySelectorAll('li');
    const scheduleBody = document.getElementById('schedule-body');
    const dayTitle = document.getElementById('day-title');

    function showCourse(day) {
        const courses = courseSchedule[day] || [];
        const noClassTip = document.getElementById('no-class-tip');
        // 判断是否为周六(6)或周日(0)
        if(day === 6 || day === 0){
            scheduleBody.innerHTML = '';
            if(noClassTip){
                noClassTip.style.display = '';
                noClassTip.textContent = `今天${day === 6 ? '周六' : '周日'}没有课喔`;
            }
            return;
        } else {
            if(noClassTip){
                noClassTip.style.display = 'none';
                noClassTip.textContent = '';
            }
        }
        scheduleBody.innerHTML = '';
        if (courses.length > 0) {
            courses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="time-cell">${course.time}</td>
                    <td class="course-cell">${course.name}</td>
                    <td class="teacher-cell">${course.teacher}</td>
                    <td class="location-cell">${course.location}</td>
                `;
                scheduleBody.appendChild(row);
            });
        } else {
            scheduleBody.innerHTML = `
                <tr>
                    <td colspan="4" class="no-class">今天没有课程安排，享受轻松的一天吧！</td>
                </tr>
            `;
        }
    }

   
    // 自动检测今天是周几（1=周一，5=周五，周六日默认显示周一）
    let today = new Date().getDay(); // 0=周日, 1=周一, ..., 6=周六
    let initDay = (today >= 1 && today <= 5) ? today : 1;
    showCourse(initDay);
    // 设置选中态
    dayItems.forEach(li => li.classList.remove('active'));
    if(dayItems[initDay-1]) dayItems[initDay-1].classList.add('active');


    function getCurrentWeek() {
        // 开学日：2025-09-08（周一）
        const startDate = new Date(2025, 8, 8); // 月份从0开始，8代表9月
        const now = new Date();
        // 只保留日期部分，忽略时分秒
        startDate.setHours(0,0,0,0);
        now.setHours(0,0,0,0);
        // 计算相差天数
        const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        // 计算周数（第一周为1）
        const week = diffDays >= 0 ? Math.floor(diffDays / 7) + 1 : 1;
        return week;
    }

    // 设置周数显示
    function updateWeekTitle() {
        const weekTitle = document.getElementById('week-title');
        if (weekTitle) {
            weekTitle.textContent = `本周是第（${getCurrentWeek()}）周`;
        }
    }
    updateWeekTitle();

    dayItems.forEach(item => {
        item.addEventListener('click', function() {
            const day = parseInt(this.getAttribute('data-day'));
            dayItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            showCourse(day);
        });
    });
});
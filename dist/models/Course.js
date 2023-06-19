"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _uuid = require('uuid');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _Discipline = require('./Discipline');
var _Period = require('./Period');




































class Course  {
  
  
  
  
  
  
  
  
  
  
  
  
  


















  
  
  

  constructor({ id, userId, name, icon, description, university, location, status, level, type, startedIn, finishedIn, dados, periods, createdAt, updatedAt }) {;Course.prototype.__init.call(this);Course.prototype.__init2.call(this);Course.prototype.__init3.call(this);Course.prototype.__init4.call(this);Course.prototype.__init5.call(this);Course.prototype.__init6.call(this);Course.prototype.__init7.call(this);Course.prototype.__init8.call(this);Course.prototype.__init9.call(this);Course.prototype.__init10.call(this);Course.prototype.__init11.call(this);Course.prototype.__init12.call(this);Course.prototype.__init13.call(this);Course.prototype.__init14.call(this);Course.prototype.__init15.call(this);Course.prototype.__init16.call(this);Course.prototype.__init17.call(this);Course.prototype.__init18.call(this);Course.prototype.__init19.call(this);Course.prototype.__init20.call(this);Course.prototype.__init21.call(this);Course.prototype.__init22.call(this);Course.prototype.__init23.call(this);Course.prototype.__init24.call(this);Course.prototype.__init25.call(this);Course.prototype.__init26.call(this);Course.prototype.__init27.call(this);Course.prototype.__init28.call(this);Course.prototype.__init29.call(this);Course.prototype.__init30.call(this);Course.prototype.__init31.call(this);Course.prototype.__init32.call(this);Course.prototype.__init33.call(this);Course.prototype.__init34.call(this);Course.prototype.__init35.call(this);Course.prototype.__init36.call(this);Course.prototype.__init37.call(this);Course.prototype.__init38.call(this);Course.prototype.__init39.call(this);Course.prototype.__init40.call(this);Course.prototype.__init41.call(this);Course.prototype.__init42.call(this);Course.prototype.__init43.call(this);Course.prototype.__init44.call(this);Course.prototype.__init45.call(this);Course.prototype.__init46.call(this);Course.prototype.__init47.call(this);Course.prototype.__init48.call(this);Course.prototype.__init49.call(this);Course.prototype.__init50.call(this);Course.prototype.__init51.call(this);Course.prototype.__init52.call(this);Course.prototype.__init53.call(this);Course.prototype.__init54.call(this);Course.prototype.__init55.call(this);Course.prototype.__init56.call(this);Course.prototype.__init57.call(this);Course.prototype.__init58.call(this);Course.prototype.__init59.call(this);Course.prototype.__init60.call(this);Course.prototype.__init61.call(this);Course.prototype.__init62.call(this);Course.prototype.__init63.call(this);Course.prototype.__init64.call(this);Course.prototype.__init65.call(this);Course.prototype.__init66.call(this);Course.prototype.__init67.call(this);Course.prototype.__init68.call(this);Course.prototype.__init69.call(this);Course.prototype.__init70.call(this);Course.prototype.__init71.call(this);Course.prototype.__init72.call(this);Course.prototype.__init73.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.name = name;
    this.icon = icon || '&#128218;';
    this.description = description || '';
    this.university = university || '';
    this.location = location || '';
    this.status = status || '';
    this.level = level || '';
    this.type = type || '';
    this.startedIn = startedIn || new Date();
    this.finishedIn = finishedIn || new Date();
    this.dados = dados || {
      cra: 0,
      mc: 0,
      iech: 0,
      iepl: 0,
      iea: 0,
      credits: 0,
      creditsInProgress: 0,
      creditsCompleted: 0,
      creditsPercentage: 0,
      workload: 0,
      workloadInProgress: 0,
      workloadCompleted: 0,
      periodsCompleted: 0,
      disciplinesInProgress: 0,
      disciplinesCompleted: 0,
      disciplinesPercentage: 0,
    };
    this.periods = periods || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getUserId = () => this.userId}

   __init3() {this.getName = () => this.name}
   __init4() {this.setName = (name) => {
    this.name = name;
    this.setUpdatedAt();
  }}

   __init5() {this.getIcon = () => this.icon}
   __init6() {this.setIcon = (icon) => {
    this.icon = icon;
    this.setUpdatedAt();
  }}

   __init7() {this.getDescription = () => this.description}
   __init8() {this.setDescription = (description) => {
    this.description = description;
    this.setUpdatedAt();
  }}

   __init9() {this.getUniversity = () => this.university}
   __init10() {this.setUniversity = (university) => {
    this.university = university;
    this.setUpdatedAt();
  }}

   __init11() {this.getLocation = () => this.location}
   __init12() {this.setLocation = (location) => {
    this.location = location;
    this.setUpdatedAt();
  }}

   __init13() {this.getStatus = () => this.status}
   __init14() {this.setStatus = (status) => {
    this.status = status;
    this.setUpdatedAt();
  }}

   __init15() {this.getLevel = () => this.level}
   __init16() {this.setLevel = (level) => {
    this.level = level;
    this.setUpdatedAt();
  }}

   __init17() {this.getType = () => this.type}
   __init18() {this.setType = (type) => {
    this.type = type;
    this.setUpdatedAt();
  }}

   __init19() {this.getStartedIn = () => this.startedIn}
   __init20() {this.setStartedIn = (startedIn) => {
    this.startedIn = startedIn;
    this.setUpdatedAt();
  }}

   __init21() {this.getFinishedIn = () => this.finishedIn}
   __init22() {this.setFinishedIn = (finishedIn) => {
    this.finishedIn = finishedIn;
    this.setUpdatedAt();
  }}

   __init23() {this.getDados = (

















) => this.dados}

   __init24() {this.setDados = (dados

















) => {
    this.dados = dados;
    this.setUpdatedAt();
  }}

   __init25() {this.getCra = () => this.dados.cra || 0}

   __init26() {this.setCra = () => {
    this.dados.cra = 0;
    this.setUpdatedAt();
  }}

   __init27() {this.getMc = () => this.dados.mc || 0}

   __init28() {this.setMc = () => {
    this.dados.mc = 0;
    this.setUpdatedAt();
  }}

   __init29() {this.getIech = () => this.dados.iech || 0}

   __init30() {this.setIech = () => {
    this.dados.iech = 0;
    this.setUpdatedAt();
  }}

   __init31() {this.getIepl = () => this.dados.iepl || 0}

   __init32() {this.setIepl = () => {
    this.dados.iepl = 0;
    this.setUpdatedAt();
  }}

   __init33() {this.getIea = () => this.dados.iea || 0}

   __init34() {this.setIea = () => {
    this.dados.iea = 0;
    this.setUpdatedAt();
  }}

   __init35() {this.getCredits = () => this.dados.credits || 0}

   __init36() {this.setCredits = () => {
    this.dados.credits = 0;
    this.setUpdatedAt();
  }}

   __init37() {this.getCreditsInProgress = () => this.dados.creditsInProgress || 0}

   __init38() {this.setCreditsInProgress = () => {
    this.dados.creditsInProgress = 0;
    this.setUpdatedAt();
  }}

   __init39() {this.getCreditsCompleted = () => this.dados.creditsCompleted || 0}

   __init40() {this.setCreditsCompleted = () => {
    this.dados.creditsCompleted = 0;
    this.setUpdatedAt();
  }}

   __init41() {this.getCreditsPercentage = () => this.dados.creditsPercentage || 0}

   __init42() {this.setCreditsPercentage = () => {
    this.dados.creditsPercentage = 0;
    this.setUpdatedAt();
  }}

   __init43() {this.getWorkload = () => this.dados.workload || 0}

   __init44() {this.setWorkload = () => {
    this.dados.workload = 0;
    this.setUpdatedAt();
  }}

   __init45() {this.getWorkloadInProgress = () => this.dados.workloadInProgress || 0}

   __init46() {this.setWorkloadInProgress = () => {
    this.dados.workloadInProgress = 0;
    this.setUpdatedAt();
  }}

   __init47() {this.getWorkloadCompleted = () => this.dados.workloadCompleted || 0}

   __init48() {this.setWorkloadCompleted = () => {
    this.dados.workloadCompleted = 0;
    this.setUpdatedAt();
  }}

   __init49() {this.getWorkloadPercentage = () => this.dados.workloadPercentage || 0}

   __init50() {this.setWorkloadPercentage = () => {
    this.dados.workloadPercentage = 0;
    this.setUpdatedAt();
  }}

   __init51() {this.getPeriodsCompleted = () => this.dados.periodsCompleted || 0}

   __init52() {this.setPeriodsCompleted = () => {
    this.dados.periodsCompleted = 0;
    this.setUpdatedAt();
  }}

   __init53() {this.getDisciplinesInProgress = () => this.dados.disciplinesInProgress || 0}

   __init54() {this.setDisciplinesInProgress = () => {
    this.dados.disciplinesInProgress = 0;
    this.setUpdatedAt();
  }}

   __init55() {this.getDisciplinesCompleted = () => this.dados.disciplinesCompleted || 0}

   __init56() {this.setDisciplinesCompleted = () => {
    this.dados.disciplinesCompleted = 0;
    this.setUpdatedAt();
  }}

   __init57() {this.getDisciplinesPercentage = () => this.dados.disciplinesPercentage || 0}

   __init58() {this.setDisciplinesPercentage = () => {
    this.dados.disciplinesPercentage = 0;
    this.setUpdatedAt();
  }}

   __init59() {this.getPeriods = () => this.periods}
   __init60() {this.setPeriods = (periods) => {
    this.periods = periods;
    this.setUpdatedAt();
  }}
   __init61() {this.deletePeriod = (id) => {
    this.periods = this.periods.filter((p) => p.getId() !== id);
    this.setUpdatedAt();
  }}

   __init62() {this.getPeriod = (id) => {
    let pe = this.periods.find((p) => {
      let myPeriod = new (0, _Period.Period)(p);
      if (myPeriod.getId() === id) return myPeriod;
    });

    if (!pe) return undefined;

    return new (0, _Period.Period)(pe);
  }}

   __init63() {this.setPeriod = (period) => {
    this.periods.push(period);
    this.setUpdatedAt();
  }}
   __init64() {this.updatePeriod = (period) => {
    this.periods = this.periods.map((p) => {
      if (p.id === period.id) p = period;
      return p;
    });

    this.setUpdatedAt();
  }}

   __init65() {this.setWorkloadAndCredits = () => {
    this.dados.workload = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      return acc + Number(period.getWorkload());
    }, 0);

    this.dados.credits = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      return acc + Number(period.getCredits());
    }, 0);

    this.dados.workloadCompleted = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      return acc + Number(period.getWorkloadCompleted());
    }, 0);

    this.dados.workloadInProgress = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      if (period.getStatus() === 'Em curso') return acc + Number(period.workload);
      return acc;
    }, 0);

    this.dados.creditsCompleted = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      period.disciplines.forEach((d) => {
        d = new (0, _Discipline.Discipline)(d);
        if (d.getStatus() === 'Aprovado') acc += Number(d.getCredits());
      });

      return acc;
    }, 0);

    function percent(a, b) {
      return Number(((Number(a) / Number(b)) * 100).toFixed(2));
    }

    this.dados.creditsPercentage = percent(this.dados.creditsCompleted, this.dados.credits);

    this.dados.creditsInProgress = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      period.disciplines.forEach((d) => {
        d = new (0, _Discipline.Discipline)(d);
        if (d.getStatus() === 'studying') acc += Number(d.getCredits());
      });

      return Number(acc.toFixed(2));
    }, 0);

    let periodsCompleted = 0;

    this.dados.disciplinesCompleted = this.periods.reduce((acc, p) => {

      const period = new (0, _Period.Period)(p);

      if (period.status === 'Concluído') periodsCompleted += 1;

      period.disciplines.forEach((d) => {
        d = new (0, _Discipline.Discipline)(d);
        if (d.getStatus() === 'Aprovado') acc += 1;
      });

      return acc;
    }, 0);

    this.dados.periodsCompleted = periodsCompleted;

    this.dados.disciplinesInProgress = this.periods.reduce((acc, p) => {
      const period = new (0, _Period.Period)(p);
      period.disciplines.forEach((d) => {
        d = new (0, _Discipline.Discipline)(d);
        if (d.getStatus() === 'studying') acc += 1;
      });

      return acc;
    }, 0);
    
    this.dados.disciplinesPercentage = percent(this.dados.disciplinesCompleted, this.dados.disciplinesCompleted + this.dados.disciplinesInProgress);

    let workload = 0,
      media = 0,
      workloadInProgress = 0,
      mc = 0,
      mc2 = 0,
      iech = 0,
      iech2 = 0,
      iech3 = 0,
      na = 0,
      na2 = 0,
      quantityOfDisciplines = 0;

    this.periods.forEach((p) => {
      const period = new (0, _Period.Period)(p);

      quantityOfDisciplines += period.disciplines.length;

      period.disciplines.forEach((d) => {
        d = new (0, _Discipline.Discipline)(d);
        if (d.getStatus() === 'studying') workloadInProgress += d.getWorkload();
      
        workload += Number(d.getWorkload());
        media += d.getMedia() * d.getWorkload();

        if (d.getStatus() === 'Aprovado') {
          mc += d.getMedia() * d.getWorkload();
          mc2 += Number(d.getWorkload());

          na++;

          na2 += Number(d.getWorkload());

          iech++;
          iech2 += Number(d.getWorkload());
        }
        iech3 += Number(d.getWorkload());
      });
    });

    this.dados.workloadPercentage = percent(this.dados.workloadCompleted, this.dados.workload);

    this.dados.cra = Number((media / workload).toFixed(4));

    this.dados.mc = Number((mc / mc2).toFixed(4));

    function sigma(n1, n2) {
      let sum = 0;
      for (let i = n1; i <= n2; i++) {
        sum += i;
      }

      return Number(sum.toFixed(2));
    }

    this.dados.iech = 0 // sigma(iech, iech2) / sigma(quantityOfDisciplines, iech2)

    this.dados.iepl = 0 // sigma(na, na2) / (this.dados.periodsCompleted * (4050 / 3030))

    this.dados.iea = 0 // this.dados.mc * this.dados.iech * this.dados.iepl;

    this.setUpdatedAt();
  }}

   __init66() {this.setDiscipline = (discipline) => {

    let period = this.getPeriod(discipline.getPeriodId());

    if (period) {
      period = new (0, _Period.Period)(period);
      period.setDiscipline(discipline);
      period.setWorkloadAndCredits();
      this.updatePeriod(period);
    }

    // ordema as disciplinas por nome

    this.periods.forEach((p) => {
      const period = new (0, _Period.Period)(p);
      period.disciplines.sort((a, b) => {
        a = new (0, _Discipline.Discipline)(a);
        b = new (0, _Discipline.Discipline)(b);

        if (a.getName() > b.getName()) return 1;
        if (a.getName() < b.getName()) return -1;
        return 0;
      });
    });

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  }}

   __init67() {this.updateDiscipline = (discipline) => {
    let period = this.getPeriod(discipline.getPeriodId());

    if (period) {
      period = new (0, _Period.Period)(period);
      period.updateDiscipline(discipline);
      period.setWorkloadAndCredits();

      this.updatePeriod(period);
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  }}


   __init68() {this.setClass = (classs, disciplineId, unityId) => {
    let period = new (0, _Period.Period)(_App2.default.get('period'));

    if (period) {
      period.setClass(classs, disciplineId, unityId);
      period.setWorkloadAndCredits();
      this.updatePeriod(period);
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  }}

   __init69() {this.deleteDiscipline = (id, periodId) => {
    let period = this.getPeriod(periodId);

    if (period) {
      period = new (0, _Period.Period)(period);

      period.removeDiscipline(id);
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
    }

    this.setUpdatedAt();
  }}

   __init70() {this.deleteClass = (id, disciplineId, periodId, unityId) => {
    let period = this.getPeriod(periodId);

    if (period) {
      period = new (0, _Period.Period)(period);
      period.removeClass(id, disciplineId, unityId);
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
    }

    this.setUpdatedAt();
  }}


   __init71() {this.getCreatedAt = () => this.createdAt}

   __init72() {this.getUpdatedAt = () => this.updatedAt}
   __init73() {this.setUpdatedAt = () => {
    this.updatedAt = new Date();
  }}
}

exports.Course = Course;
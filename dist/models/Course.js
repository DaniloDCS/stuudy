"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _uuid = require('uuid');
var _Discipline = require('./Discipline');
var _Period = require('./Period');




































class Course  {
  
  
  
  
  
  
  
  
  
  
  
  
  


















  
  
  

  constructor({
    id,
    userId,
    name,
    icon,
    description,
    university,
    location,
    status,
    level,
    type,
    startedIn,
    finishedIn,
    dados,
    periods,
    createdAt,
    updatedAt,
  }) {;Course.prototype.__init.call(this);Course.prototype.__init2.call(this);Course.prototype.__init3.call(this);Course.prototype.__init4.call(this);Course.prototype.__init5.call(this);Course.prototype.__init6.call(this);Course.prototype.__init7.call(this);Course.prototype.__init8.call(this);Course.prototype.__init9.call(this);Course.prototype.__init10.call(this);Course.prototype.__init11.call(this);Course.prototype.__init12.call(this);Course.prototype.__init13.call(this);Course.prototype.__init14.call(this);Course.prototype.__init15.call(this);Course.prototype.__init16.call(this);Course.prototype.__init17.call(this);Course.prototype.__init18.call(this);Course.prototype.__init19.call(this);Course.prototype.__init20.call(this);Course.prototype.__init21.call(this);Course.prototype.__init22.call(this);Course.prototype.__init23.call(this);Course.prototype.__init24.call(this);Course.prototype.__init25.call(this);Course.prototype.__init26.call(this);Course.prototype.__init27.call(this);Course.prototype.__init28.call(this);Course.prototype.__init29.call(this);Course.prototype.__init30.call(this);Course.prototype.__init31.call(this);Course.prototype.__init32.call(this);Course.prototype.__init33.call(this);Course.prototype.__init34.call(this);Course.prototype.__init35.call(this);Course.prototype.__init36.call(this);Course.prototype.__init37.call(this);Course.prototype.__init38.call(this);Course.prototype.__init39.call(this);Course.prototype.__init40.call(this);Course.prototype.__init41.call(this);Course.prototype.__init42.call(this);Course.prototype.__init43.call(this);Course.prototype.__init44.call(this);Course.prototype.__init45.call(this);Course.prototype.__init46.call(this);Course.prototype.__init47.call(this);Course.prototype.__init48.call(this);Course.prototype.__init49.call(this);Course.prototype.__init50.call(this);Course.prototype.__init51.call(this);Course.prototype.__init52.call(this);Course.prototype.__init53.call(this);Course.prototype.__init54.call(this);Course.prototype.__init55.call(this);Course.prototype.__init56.call(this);Course.prototype.__init57.call(this);Course.prototype.__init58.call(this);Course.prototype.__init59.call(this);Course.prototype.__init60.call(this);Course.prototype.__init61.call(this);Course.prototype.__init62.call(this);Course.prototype.__init63.call(this);Course.prototype.__init64.call(this);Course.prototype.__init65.call(this);Course.prototype.__init66.call(this);Course.prototype.__init67.call(this);Course.prototype.__init68.call(this);Course.prototype.__init69.call(this);Course.prototype.__init70.call(this);Course.prototype.__init71.call(this);Course.prototype.__init72.call(this);Course.prototype.__init73.call(this);Course.prototype.__init74.call(this);Course.prototype.__init75.call(this);Course.prototype.__init76.call(this);Course.prototype.__init77.call(this);Course.prototype.__init78.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.name = name;
    this.icon = icon || "&#128218;";
    this.description = description || "";
    this.university = university || "";
    this.location = location || "";
    this.status = status || "";
    this.level = level || "";
    this.type = type || "";
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

   __init45() {this.getWorkloadInProgress = () =>
    this.dados.workloadInProgress || 0}

   __init46() {this.setWorkloadInProgress = () => {
    this.dados.workloadInProgress = 0;
    this.setUpdatedAt();
  }}

   __init47() {this.getWorkloadCompleted = () => this.dados.workloadCompleted || 0}

   __init48() {this.setWorkloadCompleted = () => {
    this.dados.workloadCompleted = 0;
    this.setUpdatedAt();
  }}

   __init49() {this.getWorkloadPercentage = () =>
    this.dados.workloadPercentage || 0}

   __init50() {this.setWorkloadPercentage = () => {
    this.dados.workloadPercentage = 0;
    this.setUpdatedAt();
  }}

   __init51() {this.getPeriodsCompleted = () => this.dados.periodsCompleted || 0}

   __init52() {this.setPeriodsCompleted = () => {
    this.dados.periodsCompleted = 0;
    this.setUpdatedAt();
  }}

   __init53() {this.getDisciplinesInProgress = () =>
    this.dados.disciplinesInProgress || 0}

   __init54() {this.setDisciplinesInProgress = () => {
    this.dados.disciplinesInProgress = 0;
    this.setUpdatedAt();
  }}

   __init55() {this.getDisciplinesCompleted = () =>
    this.dados.disciplinesCompleted || 0}

   __init56() {this.setDisciplinesCompleted = () => {
    this.dados.disciplinesCompleted = 0;
    this.setUpdatedAt();
  }}

   __init57() {this.getDisciplinesPercentage = () =>
    this.dados.disciplinesPercentage || 0}

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
    this.periods = this.periods.filter((p) => p.id !== id);
    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  }}

   __init62() {this.getPeriod = (id) => {
    let pe = this.periods.find((p) => {
      let myPeriod = new (0, _Period.Period)(p);
      if (myPeriod.getId() === id) return myPeriod;
    });

    if (!pe) return null;

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

   __init65() {this.cra = (periods) => {
    let Nm = 0,
      Ci = 0;

    periods.forEach((period) => {
      period.disciplines.forEach((d) => {
        const discipline = new (0, _Discipline.Discipline)(d);
        Nm += discipline.getMedia() * discipline.getWorkload();
        Ci += Number(discipline.getWorkload());
      });
    });

    return Number((Nm / Ci).toFixed(4)) || 0;
  }}

   __init66() {this.mc = (periods) => {
    let Nm = 0,
      Ci = 0;

    periods.forEach((period) => {
      period.disciplines.forEach((d) => {
        const discipline = new (0, _Discipline.Discipline)(d);
        if (discipline.getStatus() == "Aprovado") {
          Nm += discipline.getMedia() * discipline.getWorkload();
          Ci += Number(discipline.getWorkload());
        }
      });
    });

    return Number((Nm / Ci).toFixed(4)) || 0;
  }}

   __init67() {this.iech = (periods) => {
    let Np = 0,
      Ci = 0,
      Ci2 = 0,
      Nm = 0;

    periods.forEach((period) => {
      period.disciplines.forEach((d) => {
        const discipline = new (0, _Discipline.Discipline)(d);
        if (discipline.getStatus() == "Aprovado") {
          Np += discipline.getMedia() * discipline.getWorkload();
          Ci += Number(discipline.getWorkload());
        }

        Nm += Number(discipline.getMedia()) * Number(discipline.getWorkload());
        Ci2 += Number(discipline.getWorkload());
      });
    });

    return Number(((Np + Ci) / (Nm + Ci2)).toFixed(4)) || 0;
  }}

   __init68() {this.iepl = (periods) => {
    let Na = 0,
      Ci = 0,
      p = 0,
      chm = 4050,
      dp = 10;

    periods.forEach((period) => {
      if (new (0, _Period.Period)(period).getStatus() === "Concluído") p += 1;
    });

    periods.forEach((period) => {
      period.disciplines.forEach((d) => {
        const discipline = new (0, _Discipline.Discipline)(d);

        if (discipline.getStatus() == "Aprovado") {
          Na += discipline.getMedia() * discipline.getWorkload();
          Ci += Number(discipline.getWorkload());
        }
      });
    });

    return Number(((Na + Ci) / (p * (chm + dp))).toFixed(4)) || 0;
  }}

   __init69() {this.iea = (periods) => {
    return Number(
      (
        this.mc(this.periods) *
        this.iech(this.periods) *
        this.iepl(this.periods)
      ).toFixed(4)
    ) || 0;
  }}

   __init70() {this.setWorkloadAndCredits = () => {
    function percent(a, b) {
      return Number(((Number(a) / Number(b)) * 100).toFixed(2));
    }

    this.dados.workload =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        return acc + Number(period.getWorkload());
      }, 0) || 0;

    this.dados.credits =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        return acc + Number(period.getCredits());
      }, 0) || 0;

    this.dados.workloadCompleted =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        return acc + Number(period.getWorkloadCompleted());
      }, 0) || 0;

    this.dados.workloadInProgress =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        if (period.getStatus() === "Em curso")
          period.disciplines.forEach((d) => {
            let discipline = new (0, _Discipline.Discipline)(d);
            if (discipline.getStatus() === "studying")
              return acc + Number(period.workload);
          });
        return acc;
      }, 0) || 0;

    this.dados.creditsCompleted =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        period.disciplines.forEach((d) => {
          d = new (0, _Discipline.Discipline)(d);
          if (d.getStatus() === "Aprovado") acc += Number(d.getCredits());
        });

        return acc;
      }, 0) || 0;

    this.dados.creditsPercentage =
      percent(this.dados.creditsCompleted, this.dados.credits) || 0;

    this.dados.creditsInProgress =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        period.disciplines.forEach((d) => {
          d = new (0, _Discipline.Discipline)(d);
          if (d.getStatus() === "studying") acc += Number(d.getCredits());
        });

        return Number(acc.toFixed(2));
      }, 0) || 0;

    let periodsCompleted = 0;

    this.dados.disciplinesCompleted = this.periods.reduce(
      (acc, p) => {
        const period = new (0, _Period.Period)(p);

        if (period.status === "Concluído") periodsCompleted += 1;

        period.disciplines.forEach((d) => {
          d = new (0, _Discipline.Discipline)(d);
          if (d.getStatus() === "Aprovado") acc += 1;
        });

        return acc;
      },
      0
    );

    this.dados.periodsCompleted = periodsCompleted;

    this.dados.disciplinesInProgress =
      this.periods.reduce((acc, p) => {
        const period = new (0, _Period.Period)(p);
        period.disciplines.forEach((d) => {
          d = new (0, _Discipline.Discipline)(d);
          if (d.getStatus() === "studying") acc += 1;
        });

        return acc;
      }, 0) || 0;

    this.dados.disciplinesPercentage =
      percent(
        this.dados.disciplinesCompleted,
        this.dados.disciplinesCompleted + this.dados.disciplinesInProgress
      ) || 0;

    this.dados.workloadPercentage =
      percent(this.dados.workloadCompleted, this.dados.workload) || 0;

    this.dados.cra = this.cra(this.periods);

    this.dados.mc = this.mc(this.periods);

    this.dados.iech = this.iech(this.periods);

    this.dados.iepl = this.iepl(this.periods);

    this.dados.iea = this.iea(this.periods);

    this.setUpdatedAt();
  }}

   __init71() {this.setDiscipline = (discipline) => {
    let period = this.getPeriod(discipline.getPeriodId());

    if (period) {
      period = new (0, _Period.Period)(period);
      period.setDiscipline(discipline);
      period.setWorkloadAndCredits();
      this.updatePeriod(period);
    }

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

   __init72() {this.updateDiscipline = (discipline) => {
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

   __init73() {this.setClass = (
    classs,
    periodId,
    disciplineId,
    unityId
  ) => {
    let period = _optionalChain([this, 'access', _4 => _4.periods, 'optionalAccess', _5 => _5.find, 'call', _6 => _6((p) => {
      if (p.id === periodId) return p;
    })]);

    if (period) {
      period.setClass(classs, disciplineId, unityId);
      period.setWorkloadAndCredits();
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
      this.setUpdatedAt();
    }
  }}

   __init74() {this.deleteDiscipline = (id, periodId) => {
    let period = this.getPeriod(periodId);

    if (period) {
      period = new (0, _Period.Period)(period);

      period.removeDiscipline(id);
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  }}

   __init75() {this.deleteClass = (
    id,
    disciplineId,
    periodId,
    unityId
  ) => {
    let period = this.getPeriod(periodId);

    if (period) {
      period = new (0, _Period.Period)(period);
      period.removeClass(id, disciplineId, unityId);
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  }}

   __init76() {this.getCreatedAt = () => this.createdAt}

   __init77() {this.getUpdatedAt = () => this.updatedAt}
   __init78() {this.setUpdatedAt = () => {
    this.updatedAt = new Date();
  }}
}

exports.Course = Course;

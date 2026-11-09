// Bilingual content from the approved specification.
export const questions=[
  {
    "id": "Q01",
    "section": "logic",
    "en": "Are the activities that drive completion linked in a realistic sequence?",
    "es": "¿Las actividades que determinan la finalización están relacionadas en una secuencia realista?",
    "options": [
      {
        "id": "A",
        "en": "Yes; the sequence to completion has been reviewed and reflects how the work will be done.",
        "es": "Sí; se revisó la secuencia hasta la finalización y refleja cómo se ejecutará el trabajo."
      },
      {
        "id": "B",
        "en": "Activities are linked, but the sequence to completion has not been fully reviewed.",
        "es": "Las actividades están relacionadas, pero no se ha revisado toda la secuencia hasta la finalización."
      },
      {
        "id": "C",
        "en": "Completion mainly depends on manually set dates or disconnected activities.",
        "es": "La finalización depende principalmente de fechas fijadas manualmente o de actividades desconectadas."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": {
      "en": "Dependencies describe what must happen before other work can proceed.",
      "es": "Las dependencias indican qué debe ocurrir antes de que otros trabajos puedan avanzar."
    },
    "action": {
      "en": "Trace the sequence from remaining work to completion; correct missing dependencies and review the recalculated forecast before relying on it.",
      "es": "Recorre la secuencia desde el trabajo pendiente hasta la finalización; corrige las dependencias faltantes y revisa la previsión recalculada antes de utilizarla."
    },
    "why": {
      "en": "Disconnected work cannot reliably transmit delays.",
      "es": "El trabajo desconectado no transmite de forma fiable los retrasos."
    },
    "maintain": {
      "en": "Recheck the driving sequence after changes.",
      "es": "Revisa la secuencia determinante después de los cambios."
    }
  },
  {
    "id": "Q02",
    "section": "logic",
    "en": "Have you checked incomplete activities for missing predecessors and successors?",
    "es": "¿Has revisado si las actividades incompletas tienen predecesoras o sucesoras faltantes?",
    "options": [
      {
        "id": "A",
        "en": "Yes; they are linked, with documented exceptions for genuine start/end boundaries or independent work.",
        "es": "Sí; están relacionadas, con excepciones documentadas para verdaderos inicios, finales o trabajos independientes."
      },
      {
        "id": "B",
        "en": "Some unexplained missing links remain, and they are being reviewed.",
        "es": "Quedan algunas relaciones faltantes sin justificar y se están revisando."
      },
      {
        "id": "C",
        "en": "Missing links are widespread or have not been systematically reviewed.",
        "es": "Las relaciones faltantes son frecuentes o no se han revisado sistemáticamente."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": {
      "en": "Do not add artificial links merely to remove a warning.",
      "es": "No agregues relaciones artificiales solo para eliminar una advertencia."
    },
    "action": {
      "en": "Review incomplete activities for missing predecessors/successors; document genuine boundaries and independent work instead of inserting artificial links.",
      "es": "Revisa las actividades incompletas para detectar predecesoras o sucesoras faltantes; documenta los límites reales y trabajos independientes sin insertar relaciones artificiales."
    },
    "why": {
      "en": "Open ends may hide prerequisites or downstream effects.",
      "es": "Los extremos abiertos pueden ocultar requisitos previos o efectos posteriores."
    },
    "maintain": {
      "en": "Check open ends at each update.",
      "es": "Revisa los extremos abiertos en cada actualización."
    }
  },
  {
    "id": "Q03",
    "section": "logic",
    "en": "Are imposed dates and constraints justified?",
    "es": "¿Las fechas impuestas y las restricciones están justificadas?",
    "options": [
      {
        "id": "A",
        "en": "There are no imposed constraints, or each has a documented reason and its effect has been reviewed.",
        "es": "No hay restricciones impuestas, o cada una tiene una razón documentada y se revisó su efecto."
      },
      {
        "id": "B",
        "en": "Some constraints need justification or an impact review.",
        "es": "Algunas restricciones necesitan justificación o revisión de su efecto."
      },
      {
        "id": "C",
        "en": "Constraints are used to force target dates without a reviewed basis.",
        "es": "Se utilizan restricciones para forzar fechas objetivo sin una base revisada."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": {
      "en": "A required contractual date can be legitimate; hiding the effect on the forecast is the concern.",
      "es": "Una fecha contractual exigida puede ser legítima; el problema es ocultar su efecto en la previsión."
    },
    "action": {
      "en": "List the purpose of each imposed date; review its impact and remove unsupported restrictions without deleting genuine contractual requirements.",
      "es": "Identifica el propósito de cada fecha impuesta; revisa su efecto y elimina restricciones sin respaldo sin borrar requisitos contractuales reales."
    },
    "why": {
      "en": "Imposed dates can mask the forecast's response to change.",
      "es": "Las fechas impuestas pueden ocultar cómo responde la previsión a los cambios."
    },
    "maintain": {
      "en": "Recheck constraint reasons when scope or targets change.",
      "es": "Revisa las razones de las restricciones cuando cambien el alcance o los objetivos."
    }
  },
  {
    "id": "Q04",
    "section": "logic",
    "en": "Can progress be verified within the duration of each activity?",
    "es": "¿Se puede verificar el avance durante la duración de cada actividad?",
    "options": [
      {
        "id": "A",
        "en": "Activities have measurable outputs suited to the review cycle; longer tasks have justified durations and interim checks.",
        "es": "Las actividades tienen resultados medibles adecuados al ciclo de revisión; las tareas largas tienen duraciones justificadas y controles intermedios."
      },
      {
        "id": "B",
        "en": "Some tasks are too broad to verify reliably between reviews.",
        "es": "Algunas tareas son demasiado amplias para verificar su avance de forma fiable entre revisiones."
      },
      {
        "id": "C",
        "en": "Many tasks are broad time blocks without measurable interim outputs.",
        "es": "Muchas tareas son bloques de tiempo amplios sin resultados intermedios medibles."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": {
      "en": "There is no universal maximum duration here. For a weekly review, ask what can actually be verified each week.",
      "es": "Aquí no se impone una duración máxima universal. En una revisión semanal, considera qué puedes comprobar realmente cada semana."
    },
    "action": {
      "en": "Break broad work into measurable outputs or add meaningful interim checks, keeping legitimate long-duration work justified.",
      "es": "Divide el trabajo amplio en resultados medibles o agrega controles intermedios útiles, justificando el trabajo legítimamente prolongado."
    },
    "why": {
      "en": "Broad tasks make progress hard to verify.",
      "es": "Las tareas amplias dificultan comprobar el avance."
    },
    "maintain": {
      "en": "Confirm measurable progress between reviews.",
      "es": "Confirma que el avance entre revisiones sea medible."
    }
  },
  {
    "id": "Q05",
    "section": "logic",
    "en": "Have negative and low total float been reviewed?",
    "es": "¿Se han revisado las holguras totales negativas y reducidas?",
    "options": [
      {
        "id": "A",
        "en": "Yes; any negative float has a reviewed cause and response, and low-float paths are monitored; or the review confirmed none.",
        "es": "Sí; toda holgura negativa tiene causa y respuesta revisadas y se supervisan las rutas con poca holgura; o la revisión confirmó que no existen."
      },
      {
        "id": "B",
        "en": "Float is visible, but some causes or responses remain unresolved.",
        "es": "La holgura es visible, pero quedan causas o respuestas sin resolver."
      },
      {
        "id": "C",
        "en": "Negative or low float is ignored, or the schedule cannot identify it.",
        "es": "Se ignora la holgura negativa o reducida, o el cronograma no permite identificarla."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": {
      "en": "Total float is the time an activity can move without delaying the applicable completion target. Low float is context-dependent; negative float signals a conflict to investigate, not automatically a defective schedule.",
      "es": "La holgura total es el tiempo que puede desplazarse una actividad sin retrasar el objetivo de finalización aplicable. Una holgura reducida depende del contexto; una holgura negativa indica un conflicto que debe investigarse, no necesariamente un cronograma defectuoso."
    },
    "action": {
      "en": "Review the causes of negative and low float, check targets and constraints, and assign feasible responses to exposed paths; do not change dates merely to remove negative float.",
      "es": "Revisa las causas de las holguras negativas y reducidas, comprueba objetivos y restricciones y asigna respuestas viables a las rutas expuestas; no cambies fechas solo para eliminar holguras negativas."
    },
    "why": {
      "en": "Unreviewed float hides pressure on completion.",
      "es": "La holgura sin revisar oculta presión sobre la finalización."
    },
    "maintain": {
      "en": "Monitor exposed paths and response actions.",
      "es": "Supervisa las rutas expuestas y las acciones de respuesta."
    }
  },
  {
    "id": "Q06",
    "section": "baseline",
    "en": "Is there an agreed reference schedule for comparing performance?",
    "es": "¿Existe un cronograma de referencia acordado para comparar el desempeño?",
    "options": [
      {
        "id": "A",
        "en": "Yes; an agreed baseline is identifiable and retained separately from the current forecast.",
        "es": "Sí; existe una línea base acordada, identificable y conservada por separado de la previsión actual."
      },
      {
        "id": "B",
        "en": "A reference version exists, but agreement or version identification is unclear.",
        "es": "Existe una versión de referencia, pero su acuerdo o identificación no está claro."
      },
      {
        "id": "C",
        "en": "No reference is retained, or the current forecast overwrites it.",
        "es": "No se conserva una referencia o la previsión actual la sobrescribe."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Identify and retain the agreed reference separately from the forecast. If none exists, agree a reference now and record its date and limitations; do not invent historical approval.",
      "es": "Identifica y conserva la referencia acordada por separado de la previsión. Si no existe, acuerda una ahora y registra su fecha y limitaciones; no inventes una aprobación histórica."
    },
    "why": {
      "en": "Without a retained reference, performance comparisons lose meaning.",
      "es": "Sin una referencia conservada, las comparaciones de desempeño pierden sentido."
    },
    "maintain": {
      "en": "Check that baseline and forecast remain separate.",
      "es": "Comprueba que la línea base y la previsión permanezcan separadas."
    }
  },
  {
    "id": "Q07",
    "section": "baseline",
    "en": "Can you explain changes from the baseline?",
    "es": "¿Puedes explicar los cambios respecto de la línea base?",
    "options": [
      {
        "id": "A",
        "en": "Yes; variances are reviewed and approved changes are traceable without erasing the original reference.",
        "es": "Sí; se revisan las desviaciones y los cambios aprobados son trazables sin borrar la referencia original."
      },
      {
        "id": "B",
        "en": "Dates are compared, but explanations or change records are incomplete.",
        "es": "Se comparan las fechas, pero las explicaciones o los registros de cambios están incompletos."
      },
      {
        "id": "C",
        "en": "Changes are not traceable, or there is no baseline for comparison.",
        "es": "Los cambios no son trazables o no existe una línea base para comparar."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Explain material baseline variances and record the basis and approval of changes while preserving the original reference.",
      "es": "Explica las desviaciones importantes respecto de la línea base y registra la base y aprobación de los cambios, conservando la referencia original."
    },
    "why": {
      "en": "Unexplained changes weaken accountability.",
      "es": "Los cambios sin explicación debilitan la trazabilidad de decisiones."
    },
    "maintain": {
      "en": "Review variance explanations each cycle.",
      "es": "Revisa las explicaciones de desviaciones en cada ciclo."
    }
  },
  {
    "id": "Q08",
    "section": "updating",
    "en": "Does the schedule have a clear, current status date?",
    "es": "¿El cronograma tiene una fecha de corte clara y vigente?",
    "options": [
      {
        "id": "A",
        "en": "Yes; the date is stated and matches the latest agreed reporting cycle.",
        "es": "Sí; la fecha está indicada y corresponde al último ciclo de reporte acordado."
      },
      {
        "id": "B",
        "en": "A date is stated, but the latest agreed update is overdue.",
        "es": "La fecha está indicada, pero la última actualización acordada está vencida."
      },
      {
        "id": "C",
        "en": "There is no reliable status date, or it does not match the reported progress.",
        "es": "No hay una fecha de corte fiable o no corresponde al avance reportado."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": {
      "en": "The status date is the cut-off separating recorded progress from remaining work; it need not be today.",
      "es": "La fecha de corte separa el avance registrado del trabajo pendiente; no tiene que ser hoy."
    },
    "action": {
      "en": "Confirm one status date matching the reporting cycle, align progress records to it and clearly label the update.",
      "es": "Confirma una fecha de corte correspondiente al ciclo de reporte, alinea los registros de avance con ella e identifica claramente la actualización."
    },
    "why": {
      "en": "An unclear cut-off mixes past facts with future forecasts.",
      "es": "Un corte poco claro mezcla hechos pasados con previsiones futuras."
    },
    "maintain": {
      "en": "Confirm the cut-off before every update.",
      "es": "Confirma el corte antes de cada actualización."
    }
  },
  {
    "id": "Q09",
    "section": "updating",
    "en": "Are actual dates and reported progress checked against records?",
    "es": "¿Se comprueban las fechas reales y el avance reportado con los registros?",
    "options": [
      {
        "id": "A",
        "en": "Yes; actual dates and measurable progress are checked at each agreed update.",
        "es": "Sí; en cada actualización acordada se comprueban las fechas reales y el avance medible."
      },
      {
        "id": "B",
        "en": "Checks are made for some work, but not consistently.",
        "es": "Se comprueban algunos trabajos, pero no de forma consistente."
      },
      {
        "id": "C",
        "en": "Progress is mainly estimated without checks, or dates are adjusted to fit the plan.",
        "es": "El avance se estima principalmente sin comprobarlo o se ajustan las fechas para que coincidan con el plan."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Check actual dates and measurable progress against available records; resolve inconsistencies and retain a note of the basis used.",
      "es": "Comprueba las fechas reales y el avance medible con los registros disponibles; resuelve las inconsistencias y conserva una nota de la base utilizada."
    },
    "why": {
      "en": "Unchecked progress undermines the remaining-work forecast.",
      "es": "El avance sin comprobar debilita la previsión del trabajo pendiente."
    },
    "maintain": {
      "en": "Repeat evidence checks at the agreed cycle.",
      "es": "Repite las comprobaciones en el ciclo acordado."
    }
  },
  {
    "id": "Q10",
    "section": "updating",
    "en": "Are remaining durations and the forecast reviewed after updating progress?",
    "es": "¿Se revisan las duraciones restantes y la previsión después de actualizar el avance?",
    "options": [
      {
        "id": "A",
        "en": "Yes; remaining work and logic are reviewed and the completion forecast is recalculated.",
        "es": "Sí; se revisan el trabajo pendiente y la lógica y se recalcula la previsión de finalización."
      },
      {
        "id": "B",
        "en": "Progress is updated, but remaining durations or the forecast receive limited review.",
        "es": "Se actualiza el avance, pero se revisan poco las duraciones restantes o la previsión."
      },
      {
        "id": "C",
        "en": "Original durations or dates are carried forward without reassessing remaining work.",
        "es": "Se mantienen duraciones o fechas originales sin reevaluar el trabajo pendiente."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Reassess remaining durations with work owners, review sequence changes and recalculate the completion forecast; investigate the movement before reporting it.",
      "es": "Reevalúa las duraciones restantes con los responsables, revisa cambios de secuencia y recalcula la previsión de finalización; investiga su variación antes de reportarla."
    },
    "why": {
      "en": "A forecast needs a current view of unfinished work.",
      "es": "La previsión necesita una visión vigente del trabajo pendiente."
    },
    "maintain": {
      "en": "Reassess remaining work after each progress update.",
      "es": "Reevalúa el trabajo pendiente después de cada actualización de avance."
    }
  },
  {
    "id": "Q11",
    "section": "updating",
    "en": "What happens to incomplete activities whose forecast finish is before the status date?",
    "es": "¿Qué ocurre con las actividades incompletas cuya finalización prevista es anterior a la fecha de corte?",
    "options": [
      {
        "id": "A",
        "en": "They are checked, actuals corrected where supported, and remaining work reforecast; or a check confirmed none.",
        "es": "Se revisan, se corrigen los datos reales cuando hay respaldo y se reprograma el trabajo pendiente; o una revisión confirmó que no existen."
      },
      {
        "id": "B",
        "en": "They are listed, but some remain unresolved.",
        "es": "Se identifican, pero algunas siguen sin resolverse."
      },
      {
        "id": "C",
        "en": "They remain in the past without a current explanation or forecast.",
        "es": "Permanecen en el pasado sin una explicación o previsión vigente."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Review overdue incomplete work; confirm actuals and forecast the remaining work from the current status position without fabricating completion.",
      "es": "Revisa el trabajo incompleto vencido; confirma los datos reales y programa el trabajo pendiente desde la situación actual, sin inventar su finalización."
    },
    "why": {
      "en": "Unfinished work left in the past obscures the current plan.",
      "es": "El trabajo pendiente dejado en el pasado oculta el plan vigente."
    },
    "maintain": {
      "en": "Check overdue incomplete work each cycle.",
      "es": "Revisa el trabajo incompleto vencido en cada ciclo."
    }
  },
  {
    "id": "Q12",
    "section": "management",
    "en": "Can the team identify the work to coordinate over the next two to four weeks?",
    "es": "¿El equipo puede identificar el trabajo que debe coordinar durante las próximas dos a cuatro semanas?",
    "options": [
      {
        "id": "A",
        "en": "Yes; near-term work, prerequisites and responsibilities are clear.",
        "es": "Sí; están claros el trabajo próximo, sus requisitos previos y las responsabilidades."
      },
      {
        "id": "B",
        "en": "Near-term dates are visible, but prerequisites or responsibilities are incomplete.",
        "es": "Se ven las fechas próximas, pero faltan requisitos previos o responsabilidades."
      },
      {
        "id": "C",
        "en": "The team cannot obtain a usable near-term work view.",
        "es": "El equipo no puede obtener una visión útil del trabajo próximo."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Review the next two to four weeks in your existing schedule; confirm prerequisites, access, responsibilities and decisions needed before work starts.",
      "es": "Revisa las próximas dos a cuatro semanas en tu cronograma actual; confirma requisitos previos, accesos, responsabilidades y decisiones antes de iniciar los trabajos."
    },
    "why": {
      "en": "Near-term coordination needs prerequisites and responsibilities.",
      "es": "La coordinación próxima necesita requisitos previos y responsables."
    },
    "maintain": {
      "en": "Reconfirm near-term readiness before coordination meetings.",
      "es": "Confirma la preparación del trabajo próximo antes de las reuniones de coordinación."
    }
  },
  {
    "id": "Q13",
    "section": "management",
    "en": "Does the schedule show which work currently drives completion?",
    "es": "¿El cronograma muestra qué trabajos determinan actualmente la finalización?",
    "options": [
      {
        "id": "A",
        "en": "Yes; the driving path has been reviewed and is consistent with the work sequence.",
        "es": "Sí; se revisó la ruta determinante y es coherente con la secuencia del trabajo."
      },
      {
        "id": "B",
        "en": "Critical or driving work is displayed, but its validity has not been reviewed.",
        "es": "Se muestran trabajos críticos o determinantes, pero no se ha revisado su validez."
      },
      {
        "id": "C",
        "en": "The schedule does not identify the work driving completion.",
        "es": "El cronograma no identifica los trabajos que determinan la finalización."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Trace the work driving completion and check that dependencies and durations support it; do not rely on colour labels alone.",
      "es": "Recorre el trabajo que determina la finalización y comprueba que las dependencias y duraciones lo respaldan; no te bases únicamente en colores."
    },
    "why": {
      "en": "Priority depends on the current driving sequence.",
      "es": "La prioridad depende de la secuencia determinante actual."
    },
    "maintain": {
      "en": "Recheck driving work after changes and updates.",
      "es": "Revisa el trabajo determinante después de cambios y actualizaciones."
    }
  },
  {
    "id": "Q14",
    "section": "management",
    "en": "Does the schedule lead to specific management actions?",
    "es": "¿El cronograma conduce a acciones de gestión concretas?",
    "options": [
      {
        "id": "A",
        "en": "Yes; reviews identify priorities, action owners and follow-up dates.",
        "es": "Sí; las revisiones identifican prioridades, responsables de acciones y fechas de seguimiento."
      },
      {
        "id": "B",
        "en": "Problems are discussed, but owners or follow-up dates are inconsistent.",
        "es": "Se comentan los problemas, pero no siempre se asignan responsables o fechas de seguimiento."
      },
      {
        "id": "C",
        "en": "It is mainly a reporting picture, with no clear actions arising from it.",
        "es": "Se utiliza principalmente como imagen para reportar, sin generar acciones claras."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Turn the most important schedule issues into actions with an owner, a due date and a review point in your existing management process.",
      "es": "Convierte los asuntos principales del cronograma en acciones con responsable, fecha y punto de revisión en tu proceso de gestión actual."
    },
    "why": {
      "en": "A report without ownership rarely produces follow-through.",
      "es": "Un informe sin responsables dificulta el seguimiento."
    },
    "maintain": {
      "en": "Follow up owners and dates at the next review.",
      "es": "Da seguimiento a responsables y fechas en la próxima revisión."
    }
  },
  {
    "id": "Q15",
    "section": "management",
    "en": "What supports confidence in the forecast completion date?",
    "es": "¿En qué se basa la confianza en la fecha prevista de finalización?",
    "options": [
      {
        "id": "A",
        "en": "Reviewed logic, remaining work and explicit assumptions support it; relevant risks are discussed.",
        "es": "La respaldan la lógica revisada, el trabajo pendiente y supuestos explícitos; se analizan los riesgos pertinentes."
      },
      {
        "id": "B",
        "en": "The forecast is used, but important assumptions or risks remain unreviewed.",
        "es": "Se utiliza la previsión, pero quedan supuestos o riesgos importantes sin revisar."
      },
      {
        "id": "C",
        "en": "The date is a target or expectation without a reviewed scheduling basis.",
        "es": "La fecha es un objetivo o una expectativa sin una base de programación revisada."
      },
      {
        "id": "U",
        "en": "I don’t know / not checked.",
        "es": "No lo sé / no comprobado."
      }
    ],
    "helper": null,
    "action": {
      "en": "Review the forecast's logic, remaining work, assumptions and material risks; communicate limitations alongside the date.",
      "es": "Revisa la lógica, el trabajo pendiente, los supuestos y los riesgos importantes de la previsión; comunica las limitaciones junto con la fecha."
    },
    "why": {
      "en": "Confidence must rest on reviewed assumptions.",
      "es": "La confianza debe apoyarse en supuestos revisados."
    },
    "maintain": {
      "en": "Reconfirm forecast assumptions and risks each cycle.",
      "es": "Reconfirma los supuestos y riesgos de la previsión en cada ciclo."
    }
  }
];

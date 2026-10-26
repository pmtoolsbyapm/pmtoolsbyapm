/* ═══════════════════════════════════════════════════
   Project friction diagnostic (EN / ES)
   Pain-led: recognise the problem first, then the tool.
   Answers stay in the browser. Nothing is sent anywhere.
   ═══════════════════════════════════════════════════ */
(function () {
  var root = document.getElementById('diag');
  if (!root) return;
  var ES = (document.documentElement.lang || '').toLowerCase().indexOf('es') === 0;

  /* Assumptions used for every time estimate (shown to the visitor). */
  var DAY = 8, WEEKS = 46;

  /* ───────────── CONTENT ───────────── */
  var EN = {
    ui: {
      qOf: 'Question {n} of {t}', back: 'Back', next: 'Next', see: 'See my results',
      pickOne: 'Choose the answer closest to what really happens.',
      pickMany: 'Select all that apply.',
      restart: 'Start again', print: 'Print or save as PDF',
      resultsEyebrow: 'Your results',
      biggest: 'Your biggest drag right now',
      alsoTwo: 'Also worth your attention',
      daysUnit: 'working days a year',
      statReporting: 'on the monthly report and preparing information for management',
      statDup: 're-entering information that already exists somewhere else',
      statMgmt: 'preparing information for management instead of managing the project',
      youMarked: 'You also told me:',
      helps: 'What helps',
      fit: 'Where the tools fit',
      goodTitle: 'Where you are in good shape',
      goodNone: 'Every area showed some friction. That is common on live projects, and it is why the order above matters: start with the first one.',
      method: 'How the numbers are worked out: each estimate uses the middle of the range you chose, an 8-hour working day and 46 working weeks a year. The figures show the size of the problem. They are not a promise of what any tool will save you.',
      newsK: 'Notes from the field',
      newsH: 'More on the problems you just recognised',
      newsP: 'I write about exactly these situations: reporting that eats the week, schedules that warn too late, risk actions nobody closes, and the records that decide a claim. Occasional, practical, no filler.',
      newsBtn: 'Subscribe', newsNote: 'NO SPAM · UNSUBSCRIBE ANY TIME',
      privacy: 'Your answers stay in this browser. If you ask for the full breakdown, only your email and your main problem areas are sent to my mailing list.',
      gateK: 'Your full breakdown is ready',
      gateH: 'See what is behind each one, and what to do about it',
      gateP: 'For each area: why it happens on projects like yours, what helps, and which tools fit. Enter your email and the breakdown opens here straight away. You will also get my occasional notes from the field.',
      gateList: 'Inside your breakdown',
      gatePh: 'your@email.com', gateBtn: 'Show my breakdown', gateSending: 'Opening…',
      gateBad: 'Please enter a valid email address.',
      gateErr: 'That did not go through. Try again or write to support@pmtoolsbyapm.com.',
      gateSmall: 'Only your email and your main problem areas are sent. No spam; unsubscribe any time.'
    },
    levels: { bad: 'Bottleneck', watch: 'Worth watching', ok: 'In good shape' },
    allGood: {
      h: 'No obvious bottleneck.',
      p: 'Your answers describe projects where information is recorded once, the schedule is actually used, risks are followed up and actions get closed. I would not sell you software to fix that. The free downloads may still be useful as a check against what you already do.',
      cta: 'See the free downloads', href: 'resources.html'
    },
    areas: {
      reporting: {
        name: 'Monthly reporting',
        bad: 'Reporting is costing you more than it should',
        watch: 'Reporting is starting to take real time',
        body: 'Most of the effort in your report is going into finding, chasing and formatting information, not into reading what it says. That should be the shortest part of the job, and on your projects it is one of the longest.',
        q1: 'About {h} hours a month on the report alone. Over a year, that is roughly {d} working days.',
        q8: 'Preparing information for management takes about {h} hours of your week, roughly {d} working days a year.',
        overlap: 'The monthly report is part of that time, so I have not added the two figures together.',
        fix: 'Reports get shorter when each number is recorded once, where the work happens, and the report reads from those records instead of being rebuilt every month. None of this removes reporting. It removes the re-typing.',
        tools: [
          { name: 'BuildTrack', what: 'Daily logs, budget, risks, variations and tasks in one place, with an executive dashboard that shows progress, cost and open issues on one screen.', href: 'buildtrack.html', cta: 'See BuildTrack' },
          { name: 'PM Starter Kit', what: 'The lower-cost route: a monthly progress report that takes every figure from the registers behind it, in Excel and Word. One payment, no subscription.', href: 'starter-kit.html', cta: 'See the Starter Kit' }
        ]
      },
      schedule: {
        name: 'Schedule control',
        bad: 'Your schedule is telling you about delay after it has happened',
        watch: 'Your schedule is warning you later than it could',
        body: 'When the cause of a delay only shows up at the monthly update, you lose the weeks in which recovery was cheapest. A schedule kept mainly for the report rarely gets used to run the work, so the site plans from memory and the programme catches up afterwards.',
        lag: {
          c: 'Up to four weeks can pass between a slip on site and the first response to it.',
          d: 'By the time you see the delay, the completion date has already moved.',
          e: 'Without a working schedule there is no early warning at all, only the date you missed.'
        },
        fix: 'A schedule earns its keep when it shows, every week, which activities are driving the finish and what needs attention before the next meeting. That is a habit as much as a tool, but the tool has to make it easy enough to keep.',
        tools: [
          { name: 'Project Scheduler', what: 'Critical path, float and the driving activities explained in plain language. A health check that flags missing logic and progress shortfalls, and two- and four-week look-aheads for the site meeting. No MS Project or P6 course required.', href: 'scheduler.html', cta: 'See the Scheduler' },
          { name: 'Free schedule template', what: 'If you want to start with a spreadsheet, the free construction schedule template includes a 10-point health check.', href: 'resources.html', cta: 'Get the template' }
        ]
      },
      risk: {
        name: 'Risk follow-up',
        bad: 'Risks are being identified, then left alone',
        watch: 'Risk actions are slipping between reviews',
        body: 'Identifying a risk is the easy part. The register earns its keep between meetings, when someone checks whether the agreed action happened and whether the exposure actually moved. On your projects that check is not happening reliably.',
        fix: 'Every risk action needs an owner, a date and a review where somebody asks whether the exposure went down. A register that only changes on meeting day is a list, not a control.',
        tools: [
          { name: 'Risk Health Check', what: 'A guided assessment that turns your answers into specific risks with owners and recommended actions, then tracks status, due dates and residual exposure through every review cycle.', href: 'risk.html', cta: 'See the Risk Health Check' },
          { name: 'Free risk register', what: 'The no-cost start: a risk register with live scoring and a heat map.', href: 'resources.html', cta: 'Get the register' }
        ]
      },
      visibility: {
        name: 'Project visibility',
        bad: 'An accurate project status takes too long to produce',
        watch: 'Your project status takes effort to pull together',
        body: 'When the true position takes a day or more to assemble, decisions wait for it, or get made without it. The information usually exists. It just lives in several places and in several people\'s heads.',
        q4: 'Each status request costs you a few days, and part of the answer is still an estimate.',
        noReports: 'You also said you don\'t produce regular reports, so there is no routine picture of the project to fall back on.',
        fix: 'Status should be something you read, not something you build. That means the progress, cost and issue records are kept current as part of the work, not reconstructed when someone asks.',
        tools: [
          { name: 'BuildTrack', what: 'An executive dashboard built for the conversation with the client: progress, cost performance and open issues on one screen, fed by the daily logs and registers.', href: 'buildtrack.html', cta: 'See BuildTrack' }
        ]
      },
      duplication: {
        name: 'Information flow',
        bad: 'The same information is being entered more than once',
        watch: 'Some information is being entered twice',
        body: 'Every time a number is typed into a second place, you pay for it twice: once in time, and again when the two copies stop agreeing and someone has to work out which one is right.',
        q5: 'Re-entering information takes roughly {d} working days a year.',
        fix: 'This is often a workflow problem before it is a software problem. Decide where each piece of information is recorded first, and make everything else read from there.',
        tools: [
          { name: 'BuildTrack', what: 'CSV import brings your schedule and budget in from Excel instead of retyping them, and the modules share the same project data.', href: 'buildtrack.html', cta: 'See BuildTrack' },
          { name: 'Talk it through', what: 'If your information is spread across several systems, write to me with a short description of how it flows today. I will tell you honestly whether a tool will fix it or whether the process needs to change first.', href: 'mailto:support@pmtoolsbyapm.com?subject=Diagnostic%20-%20information%20flow', cta: 'Write to me' }
        ]
      },
      actions: {
        name: 'Meeting actions',
        bad: 'Agreed actions are not getting closed',
        watch: 'Some agreed actions are rolling over',
        body: 'When the same actions reappear in the minutes month after month, the meeting has turned into a reporting exercise. People leave knowing what was said, not what they have to do by when.',
        fix: 'An action closes when it has one owner, a date, and someone who checks it before the next meeting rather than during it.',
        tools: [
          { name: 'PM Starter Kit', what: 'Meeting minutes with an action tracker that gives every action an owner and a date, and shows what is overdue before the next meeting.', href: 'starter-kit.html', cta: 'See the Starter Kit' },
          { name: 'BuildTrack', what: 'Task management across the team: assign, track and close, visible to the people who need it instead of buried in a chat.', href: 'buildtrack.html', cta: 'See BuildTrack' }
        ]
      }
    },
    qs: [
      { id: 'q1', area: 'reporting', text: 'When your monthly project report is due, how much time goes into collecting the information and putting it together?', opts: [
        { t: 'Less than 2 hours. Most of it is already where I need it.', s: 0, h: 1.5 },
        { t: 'About half a day. Some of it has to be consolidated by hand.', s: 1, h: 4 },
        { t: 'One to two days. I chase updates and rebuild charts and tables.', s: 2, h: 12 },
        { t: 'More than two days. The report becomes a project of its own.', s: 3, h: 20 },
        { t: 'We don\'t produce regular project reports.', s: 0, h: 0, noReports: true }
      ] },
      { id: 'q2', area: 'schedule', text: 'When a project starts falling behind, how quickly can you see which activities are causing it and what needs to happen next?', opts: [
        { t: 'Within a day. The schedule shows me what is driving it.', s: 0 },
        { t: 'Within a week, after going through the schedule with the team.', s: 1 },
        { t: 'At the next monthly update, when the dates are recalculated.', s: 2, lag: 'c' },
        { t: 'Usually after the completion date has already moved.', s: 3, lag: 'd' },
        { t: 'We don\'t keep a working schedule.', s: 2, lag: 'e' }
      ] },
      { id: 'q3', area: 'risk', text: 'Have you ever identified a project risk, agreed an action, and found out weeks later that nobody followed it up?', opts: [
        { t: 'No. Every risk action has an owner and a date, and we review them.', s: 0 },
        { t: 'Once or twice. It gets caught at the next review.', s: 1 },
        { t: 'Regularly. The register is updated for the meetings, not between them.', s: 2 },
        { t: 'We usually find out when the risk has already happened.', s: 3 },
        { t: 'We don\'t keep a risk register.', s: 2 }
      ] },
      { id: 'q4', area: 'visibility', text: 'If your client or director asked for an accurate project status right now, how much work would it take to give them one?', opts: [
        { t: 'None. I could answer today from what I already have.', s: 0 },
        { t: 'An hour or two of checking with the team.', s: 1 },
        { t: 'Most of a day. The information is in several places.', s: 2 },
        { t: 'I would ask for a few days, and part of the answer would still be an estimate.', s: 3, days: true }
      ] },
      { id: 'q5', area: 'duplication', text: 'How often do you enter the same project information into more than one spreadsheet, report or system?', opts: [
        { t: 'Rarely. Information is entered once and reused.', s: 0, y: 0 },
        { t: 'A few times a month.', s: 1, y: 24 },
        { t: 'Every week.', s: 2, y: 69 },
        { t: 'Every day. The same numbers live in several places.', s: 3, y: 115 }
      ] },
      { id: 'q6', area: 'actions', text: 'When an action is agreed in a project meeting, how confident are you that it will be done before the next meeting?', opts: [
        { t: 'Very confident. Actions have owners and dates, and we check them.', s: 0 },
        { t: 'Fairly confident. Most get done; a few roll over.', s: 1 },
        { t: 'Not very. The same actions appear in the minutes month after month.', s: 2 },
        { t: 'Honestly, we don\'t track actions between meetings.', s: 3 }
      ] },
      { id: 'q7', area: 'schedule', text: 'Which of these describes your project schedule best?', opts: [
        { t: 'It tells the team what needs attention this week, and we use it on site.', s: 0 },
        { t: 'We use it for the look-ahead, but it drifts between updates.', s: 1 },
        { t: 'It is updated mainly for the monthly report.', s: 2 },
        { t: 'It was built for the tender or the contract and has hardly been used since.', s: 3 }
      ] },
      { id: 'q8', area: 'reporting', text: 'In a normal week, how much of your time goes into preparing information for management instead of actually managing the project?', opts: [
        { t: 'Less than two hours.', s: 0, w: 1.5 },
        { t: 'About half a day.', s: 1, w: 4 },
        { t: 'About a full day.', s: 2, w: 8 },
        { t: 'Two days or more.', s: 3, w: 16 }
      ] },
      { id: 'q9', multi: true, text: 'In the last six months, which of these has happened on your projects?', opts: [
        { t: 'A deadline was missed, and we only saw it coming when it was too late.', area: 'schedule' },
        { t: 'A decision was made late because the information wasn\'t ready.', area: 'visibility' },
        { t: 'An agreed action fell through because nobody really owned it.', area: 'actions' },
        { t: 'The client questioned our report or our numbers.', area: 'reporting' },
        { t: 'Two documents gave different numbers for the same thing.', area: 'duplication' },
        { t: 'A risk we had already identified turned into a problem.', area: 'risk' },
        { t: 'None of these.', none: true }
      ] }
    ]
  };

  var ESC = {
    ui: {
      qOf: 'Pregunta {n} de {t}', back: 'Atrás', next: 'Siguiente', see: 'Ver mis resultados',
      pickOne: 'Elige la respuesta más cercana a lo que de verdad pasa.',
      pickMany: 'Marca todas las que apliquen.',
      restart: 'Empezar de nuevo', print: 'Imprimir o guardar en PDF',
      resultsEyebrow: 'Tus resultados',
      biggest: 'Lo que más te está frenando ahora',
      alsoTwo: 'También merece tu atención',
      daysUnit: 'días laborables al año',
      statReporting: 'en el informe mensual y en preparar información para la gerencia',
      statDup: 'volviendo a registrar información que ya existe en otro lugar',
      statMgmt: 'preparando información para la gerencia en lugar de gestionar el proyecto',
      youMarked: 'También marcaste:',
      helps: 'Qué ayuda',
      fit: 'Dónde encajan las herramientas',
      goodTitle: 'Donde estás bien',
      goodNone: 'Todas las áreas mostraron algo de fricción. Es normal en proyectos en ejecución, y por eso importa el orden de arriba: empieza por la primera.',
      method: 'Cómo se calculan las cifras: cada estimado usa el punto medio del rango que elegiste, una jornada de 8 horas y 46 semanas laborables al año. Las cifras muestran el tamaño del problema. No son una promesa de lo que una herramienta te va a ahorrar.',
      newsK: 'Notas desde la obra',
      newsH: 'Más sobre los problemas que acabas de reconocer',
      newsP: 'Escribo justamente sobre estas situaciones: informes que se comen la semana, cronogramas que avisan tarde, acciones de riesgo que nadie cierra y los registros que deciden un reclamo. De vez en cuando, práctico y sin relleno.',
      newsBtn: 'Suscribirme', newsNote: 'SIN SPAM · CANCELA CUANDO QUIERAS',
      privacy: 'Tus respuestas se quedan en este navegador. Si pides el análisis completo, solo se envían a mi lista tu correo y tus principales áreas de problema.',
      gateK: 'Tu análisis completo está listo',
      gateH: 'Descubre qué hay detrás de cada una y qué hacer al respecto',
      gateP: 'Para cada área: por qué pasa en proyectos como el tuyo, qué ayuda y qué herramientas encajan. Escribe tu correo y el análisis se abre aquí mismo. También recibirás, de vez en cuando, mis notas desde la obra.',
      gateList: 'Lo que incluye tu análisis',
      gatePh: 'tu@correo.com', gateBtn: 'Ver mi análisis', gateSending: 'Abriendo…',
      gateBad: 'Escribe un correo válido.',
      gateErr: 'No se pudo completar. Inténtalo de nuevo o escribe a support@pmtoolsbyapm.com.',
      gateSmall: 'Solo se envían tu correo y tus principales áreas de problema. Sin spam; cancela cuando quieras.'
    },
    levels: { bad: 'Cuello de botella', watch: 'Vale la pena vigilar', ok: 'Bien' },
    allGood: {
      h: 'No hay un cuello de botella evidente.',
      p: 'Tus respuestas describen proyectos donde la información se registra una sola vez, el cronograma se usa de verdad, los riesgos tienen seguimiento y las acciones se cierran. No te vendería un software para arreglar eso. Las descargas gratuitas pueden servirte igual como contraste con lo que ya haces.',
      cta: 'Ver las descargas gratuitas', href: 'recursos.html'
    },
    areas: {
      reporting: {
        name: 'Informe mensual',
        bad: 'El informe te está costando más de lo que debería',
        watch: 'El informe empieza a tomar tiempo de verdad',
        body: 'La mayor parte del esfuerzo de tu informe se va en buscar, perseguir y dar formato a la información, no en leer lo que dice. Esa debería ser la parte más corta del trabajo, y en tus proyectos es de las más largas.',
        q1: 'Unas {h} horas al mes solo en el informe. En un año son aproximadamente {d} días laborables.',
        q8: 'Preparar información para la gerencia te toma unas {h} horas a la semana, aproximadamente {d} días laborables al año.',
        overlap: 'El informe mensual forma parte de ese tiempo, así que no sumé las dos cifras.',
        fix: 'El informe se acorta cuando cada cifra se registra una sola vez, donde ocurre el trabajo, y el informe lee de esos registros en lugar de rehacerse cada mes. Nada de esto elimina el informe. Elimina volver a escribir lo mismo.',
        tools: [
          { name: 'BuildTrack', what: 'Bitácoras diarias, presupuesto, riesgos, variaciones y tareas en un solo lugar, con un panel ejecutivo que muestra avance, costo y temas abiertos en una sola pantalla.', href: 'buildtrack.html', cta: 'Ver BuildTrack' },
          { name: 'PM Starter Kit', what: 'La opción de menor costo: un informe mensual de avance que toma cada cifra de los registros que lo respaldan, en Excel y Word. Un solo pago, sin suscripción.', href: 'kit-inicial.html', cta: 'Ver el Starter Kit' }
        ]
      },
      schedule: {
        name: 'Control del cronograma',
        bad: 'Tu cronograma te avisa del atraso cuando ya ocurrió',
        watch: 'Tu cronograma te avisa más tarde de lo que podría',
        body: 'Cuando la causa de un atraso aparece recién en la actualización mensual, pierdes justamente las semanas en las que recuperarse era más barato. Un cronograma que se mantiene sobre todo para el informe casi nunca se usa para dirigir el trabajo: la obra planifica de memoria y el programa se pone al día después.',
        lag: {
          c: 'Pueden pasar hasta cuatro semanas entre un atraso en obra y la primera respuesta.',
          d: 'Cuando ves el atraso, la fecha de terminación ya se movió.',
          e: 'Sin un cronograma de trabajo no hay alerta temprana, solo la fecha que se incumplió.'
        },
        fix: 'Un cronograma vale la pena cuando muestra, cada semana, qué actividades están definiendo la fecha de terminación y qué necesita atención antes de la siguiente reunión. Es tanto un hábito como una herramienta, pero la herramienta tiene que hacerlo lo bastante fácil para sostenerlo.',
        tools: [
          { name: 'Planificador', what: 'Ruta crítica, holgura y las actividades que mandan, explicadas en lenguaje claro. Una revisión de salud que señala lógica faltante y avances por debajo de lo previsto, y programaciones a dos y cuatro semanas para la reunión de obra. Sin curso de MS Project ni de P6.', href: 'planificador.html', cta: 'Ver el Planificador' },
          { name: 'Plantilla gratuita de cronograma', what: 'Si prefieres empezar con una hoja de cálculo, la plantilla gratuita de cronograma de obra incluye una revisión de 10 puntos.', href: 'recursos.html', cta: 'Obtener la plantilla' }
        ]
      },
      risk: {
        name: 'Seguimiento de riesgos',
        bad: 'Los riesgos se identifican y luego se quedan ahí',
        watch: 'Las acciones de riesgo se están quedando entre revisiones',
        body: 'Identificar un riesgo es la parte fácil. La matriz demuestra su valor entre reuniones, cuando alguien verifica si la acción acordada se hizo y si la exposición realmente bajó. En tus proyectos esa verificación no está ocurriendo de forma confiable.',
        fix: 'Cada acción de riesgo necesita un responsable, una fecha y una revisión donde alguien pregunte si la exposición bajó. Una matriz que solo cambia el día de la reunión es una lista, no un control.',
        tools: [
          { name: 'Chequeo de riesgos', what: 'Una evaluación guiada que convierte tus respuestas en riesgos concretos con responsables y acciones recomendadas, y luego da seguimiento al estado, las fechas límite y la exposición residual en cada ciclo de revisión.', href: '../risk.html', cta: 'Ver el Chequeo de riesgos' },
          { name: 'Matriz de riesgos gratuita', what: 'Para empezar sin costo: una matriz de riesgos con puntuación automática y mapa de calor.', href: 'recursos.html', cta: 'Obtener la matriz' }
        ]
      },
      visibility: {
        name: 'Visibilidad del proyecto',
        bad: 'Dar un estado real del proyecto toma demasiado tiempo',
        watch: 'Armar el estado del proyecto requiere esfuerzo',
        body: 'Cuando la situación real toma un día o más en reunirse, las decisiones la esperan o se toman sin ella. Casi siempre la información existe. Solo que está en varios lugares y en la cabeza de varias personas.',
        q4: 'Cada solicitud de estado te cuesta unos días, y parte de la respuesta sigue siendo un estimado.',
        noReports: 'También dijiste que no preparan informes periódicos, así que no hay una imagen regular del proyecto a la cual recurrir.',
        fix: 'El estado del proyecto debería ser algo que se lee, no algo que se construye. Eso significa que los registros de avance, costo y temas abiertos se mantienen al día como parte del trabajo, no se reconstruyen cuando alguien pregunta.',
        tools: [
          { name: 'BuildTrack', what: 'Un panel ejecutivo pensado para la conversación con el cliente: avance, desempeño de costos y temas abiertos en una sola pantalla, alimentado por las bitácoras y los registros.', href: 'buildtrack.html', cta: 'Ver BuildTrack' }
        ]
      },
      duplication: {
        name: 'Flujo de información',
        bad: 'La misma información se registra más de una vez',
        watch: 'Parte de la información se registra dos veces',
        body: 'Cada vez que una cifra se escribe en un segundo lugar la pagas dos veces: una en tiempo, y otra cuando las dos copias dejan de coincidir y alguien tiene que averiguar cuál es la correcta.',
        q5: 'Volver a registrar información te toma aproximadamente {d} días laborables al año.',
        fix: 'Muchas veces es un problema de flujo de trabajo antes que de software. Define dónde se registra primero cada dato y haz que todo lo demás lea de ahí.',
        tools: [
          { name: 'BuildTrack', what: 'La importación CSV trae tu cronograma y tu presupuesto desde Excel en lugar de volver a escribirlos, y los módulos comparten los mismos datos del proyecto.', href: 'buildtrack.html', cta: 'Ver BuildTrack' },
          { name: 'Conversémoslo', what: 'Si tu información está repartida en varios sistemas, escríbeme con una descripción breve de cómo fluye hoy. Te diré con honestidad si una herramienta lo resuelve o si primero hay que cambiar el proceso.', href: 'mailto:support@pmtoolsbyapm.com?subject=Diagn%C3%B3stico%20-%20flujo%20de%20informaci%C3%B3n', cta: 'Escríbeme' }
        ]
      },
      actions: {
        name: 'Acciones de reunión',
        bad: 'Las acciones acordadas no se están cerrando',
        watch: 'Algunas acciones acordadas pasan de una reunión a otra',
        body: 'Cuando las mismas acciones reaparecen en las minutas mes tras mes, la reunión se convirtió en un ejercicio de reporte. La gente sale sabiendo qué se dijo, no qué tiene que hacer y para cuándo.',
        fix: 'Una acción se cierra cuando tiene un solo responsable, una fecha y alguien que la verifica antes de la siguiente reunión, no durante ella.',
        tools: [
          { name: 'PM Starter Kit', what: 'Minutas de reunión con un control de acciones que asigna responsable y fecha a cada una, y muestra lo vencido antes de la siguiente reunión.', href: 'kit-inicial.html', cta: 'Ver el Starter Kit' },
          { name: 'BuildTrack', what: 'Gestión de tareas para todo el equipo: asignar, dar seguimiento y cerrar, visible para quien lo necesita en lugar de perdido en un chat.', href: 'buildtrack.html', cta: 'Ver BuildTrack' }
        ]
      }
    },
    qs: [
      { id: 'q1', area: 'reporting', text: 'Cuando se acerca la fecha del informe mensual del proyecto, ¿cuánto tiempo te toma reunir la información y armarlo?', opts: [
        { t: 'Menos de 2 horas. Casi todo ya está donde lo necesito.', s: 0, h: 1.5 },
        { t: 'Alrededor de medio día. Hay que consolidar algunas cosas a mano.', s: 1, h: 4 },
        { t: 'Uno o dos días. Persigo actualizaciones y rehago gráficos y tablas.', s: 2, h: 12 },
        { t: 'Más de dos días. El informe se convierte en un proyecto aparte.', s: 3, h: 20 },
        { t: 'No preparamos informes periódicos del proyecto.', s: 0, h: 0, noReports: true }
      ] },
      { id: 'q2', area: 'schedule', text: 'Cuando un proyecto empieza a atrasarse, ¿qué tan rápido puedes ver qué actividades lo están causando y qué hay que hacer?', opts: [
        { t: 'En un día. El cronograma me muestra qué lo está provocando.', s: 0 },
        { t: 'En una semana, después de revisar el cronograma con el equipo.', s: 1 },
        { t: 'En la siguiente actualización mensual, cuando se recalculan las fechas.', s: 2, lag: 'c' },
        { t: 'Normalmente cuando la fecha de terminación ya se movió.', s: 3, lag: 'd' },
        { t: 'No llevamos un cronograma de trabajo.', s: 2, lag: 'e' }
      ] },
      { id: 'q3', area: 'risk', text: '¿Te ha pasado que identifican un riesgo, acuerdan una acción y semanas después descubres que nadie le dio seguimiento?', opts: [
        { t: 'No. Cada acción tiene responsable y fecha, y las revisamos.', s: 0 },
        { t: 'Una o dos veces. Se detecta en la siguiente revisión.', s: 1 },
        { t: 'Con frecuencia. La matriz se actualiza para las reuniones, no entre ellas.', s: 2 },
        { t: 'Normalmente nos enteramos cuando el riesgo ya ocurrió.', s: 3 },
        { t: 'No llevamos una matriz de riesgos.', s: 2 }
      ] },
      { id: 'q4', area: 'visibility', text: 'Si tu cliente o tu director te pidiera ahora mismo el estado real del proyecto, ¿cuánto trabajo te tomaría dárselo?', opts: [
        { t: 'Ninguno. Podría responder hoy con lo que ya tengo.', s: 0 },
        { t: 'Una o dos horas confirmando con el equipo.', s: 1 },
        { t: 'Casi un día. La información está en varios lugares.', s: 2 },
        { t: 'Pediría unos días, y parte de la respuesta seguiría siendo un estimado.', s: 3, days: true }
      ] },
      { id: 'q5', area: 'duplication', text: '¿Con qué frecuencia registras la misma información del proyecto en más de una hoja de cálculo, informe o sistema?', opts: [
        { t: 'Casi nunca. Se registra una vez y se reutiliza.', s: 0, y: 0 },
        { t: 'Algunas veces al mes.', s: 1, y: 24 },
        { t: 'Todas las semanas.', s: 2, y: 69 },
        { t: 'Todos los días. Las mismas cifras viven en varios lugares.', s: 3, y: 115 }
      ] },
      { id: 'q6', area: 'actions', text: 'Cuando se acuerda una acción en una reunión del proyecto, ¿qué tan seguro estás de que estará cumplida antes de la siguiente?', opts: [
        { t: 'Muy seguro. Las acciones tienen responsable y fecha, y las verificamos.', s: 0 },
        { t: 'Bastante. La mayoría se cumple; algunas pasan a la siguiente reunión.', s: 1 },
        { t: 'Poco. Las mismas acciones aparecen en las minutas mes tras mes.', s: 2 },
        { t: 'Sinceramente, no damos seguimiento a las acciones entre reuniones.', s: 3 }
      ] },
      { id: 'q7', area: 'schedule', text: '¿Cuál de estas opciones describe mejor el cronograma de tu proyecto?', opts: [
        { t: 'Le dice al equipo qué necesita atención esta semana, y lo usamos en obra.', s: 0 },
        { t: 'Lo usamos para programar las próximas semanas, pero se desfasa entre actualizaciones.', s: 1 },
        { t: 'Se actualiza principalmente para el informe mensual.', s: 2 },
        { t: 'Se hizo para la licitación o el contrato y casi no se ha usado desde entonces.', s: 3 }
      ] },
      { id: 'q8', area: 'reporting', text: 'En una semana normal, ¿cuánto de tu tiempo se va en preparar información para la gerencia en lugar de gestionar el proyecto?', opts: [
        { t: 'Menos de dos horas.', s: 0, w: 1.5 },
        { t: 'Alrededor de medio día.', s: 1, w: 4 },
        { t: 'Más o menos un día completo.', s: 2, w: 8 },
        { t: 'Dos días o más.', s: 3, w: 16 }
      ] },
      { id: 'q9', multi: true, text: 'En los últimos seis meses, ¿cuáles de estas situaciones han ocurrido en tus proyectos?', opts: [
        { t: 'Se incumplió una fecha y lo vimos venir cuando ya era tarde.', area: 'schedule' },
        { t: 'Una decisión se tomó tarde porque la información no estaba lista.', area: 'visibility' },
        { t: 'Una acción acordada no se cumplió porque en realidad nadie era responsable.', area: 'actions' },
        { t: 'El cliente cuestionó nuestro informe o nuestras cifras.', area: 'reporting' },
        { t: 'Dos documentos daban cifras distintas para lo mismo.', area: 'duplication' },
        { t: 'Un riesgo que ya habíamos identificado se convirtió en un problema.', area: 'risk' },
        { t: 'Ninguna de estas.', none: true }
      ] }
    ]
  };

  var C = ES ? ESC : EN;
  var ORDER = ['reporting', 'schedule', 'risk', 'visibility', 'duplication', 'actions'];

  /* ───────────── STATE ───────────── */
  var answers = {};   // id -> option index (single) or array of indexes (multi)
  var step = 0;       // 0..qs.length-1 ; qs.length = results

  var stage = root.querySelector('[data-stage]');
  var intro = root.querySelector('[data-intro]');
  var results = root.querySelector('[data-results]');

  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function n(x) { return Math.round(x).toLocaleString(ES ? 'es' : 'en'); }

  /* ───────────── QUESTION SCREEN ───────────── */
  function renderQ() {
    var q = C.qs[step], total = C.qs.length;
    var pct = Math.round((step / total) * 100);
    var sel = answers[q.id];
    var type = q.multi ? 'checkbox' : 'radio';
    var html = '' +
      '<div class="dx-prog" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
      '<div class="ctrl dx-count"><span>' + fmt(C.ui.qOf, { n: step + 1, t: total }) + '</span></div>' +
      '<fieldset class="dx-q"><legend><h2 class="display" tabindex="-1">' + esc(q.text) + '</h2>' +
      '<span class="dx-hint">' + (q.multi ? C.ui.pickMany : C.ui.pickOne) + '</span></legend>' +
      '<div class="dx-opts">';
    q.opts.forEach(function (o, i) {
      var on = q.multi ? (sel || []).indexOf(i) > -1 : sel === i;
      html += '<label class="dx-opt' + (on ? ' on' : '') + (o.none ? ' dx-none' : '') + '">' +
        '<input type="' + type + '" name="' + q.id + '" value="' + i + '"' + (on ? ' checked' : '') + '>' +
        '<span class="dx-mark" aria-hidden="true"></span><span class="dx-t">' + esc(o.t) + '</span></label>';
    });
    html += '</div></fieldset><div class="dx-nav">' +
      '<button type="button" class="btn btn-line" data-back' + (step === 0 ? ' disabled' : '') + '>' + C.ui.back + '</button>';
    if (q.multi) {
      html += '<button type="button" class="btn btn-solid" data-next' + ((sel && sel.length) ? '' : ' disabled') + '>' + C.ui.see +
        '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>';
    } else if (sel !== undefined) {
      html += '<button type="button" class="btn btn-solid" data-next>' + C.ui.next +
        '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>';
    }
    html += '</div>';
    stage.innerHTML = html;
    stage.hidden = false;

    stage.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var i = +inp.value;
        if (q.multi) {
          var cur = (answers[q.id] || []).slice();
          var noneIdx = q.opts.findIndex(function (o) { return o.none; });
          if (inp.checked) {
            if (q.opts[i].none) cur = [i];
            else { cur = cur.filter(function (x) { return x !== noneIdx; }); cur.push(i); }
          } else cur = cur.filter(function (x) { return x !== i; });
          answers[q.id] = cur;
          renderQ();
          var again = stage.querySelector('input[value="' + i + '"]'); if (again) again.focus();
        } else {
          answers[q.id] = i;
          stage.querySelectorAll('.dx-opt').forEach(function (l, k) { l.classList.toggle('on', k === i); });
          setTimeout(function () { go(1); }, 260);   // short pause so the choice is seen
        }
      });
    });
    var b = stage.querySelector('[data-back]'); if (b) b.addEventListener('click', function () { go(-1); });
    var nx = stage.querySelector('[data-next]'); if (nx) nx.addEventListener('click', function () { go(1); });
  }

  function go(d) {
    step = Math.max(0, Math.min(C.qs.length, step + d));
    if (step === C.qs.length) return showResults();
    renderQ();
    var h = stage.querySelector('h2'); if (h) h.focus({ preventScroll: true });
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ───────────── SCORING ───────────── */
  function score() {
    var A = {};
    ORDER.forEach(function (k) { A[k] = { pts: 0, max: 0, notes: [], quant: [], marked: [] }; });
    var q = {};
    C.qs.forEach(function (qq) { q[qq.id] = qq; });
    function opt(id) { var i = answers[id]; return i === undefined ? null : q[id].opts[i]; }

    C.qs.forEach(function (qq) {
      if (qq.multi) return;
      A[qq.area].max += 3;
      var o = opt(qq.id); if (o) A[qq.area].pts += o.s;
    });
    // consequences: +1 each, and each area can gain at most 1 point from them
    var picked = answers.q9 || [];
    ORDER.forEach(function (k) { A[k].max += 1; });
    picked.forEach(function (i) {
      var o = q.q9.opts[i]; if (!o || o.none) return;
      A[o.area].pts += 1; A[o.area].marked.push(o.t);
    });
    // no regular reporting means no routine picture of the project
    var o1 = opt('q1');
    if (o1 && o1.noReports) { A.visibility.pts += 1; A.visibility.noReports = true; }

    var out = ORDER.map(function (k) {
      var a = A[k], pct = Math.min(100, Math.round(a.pts / a.max * 100));
      return { key: k, pct: pct, level: pct >= 55 ? 'bad' : (pct >= 30 ? 'watch' : 'ok'), a: a };
    });

    // quantification (only used when the area is flagged)
    var T = C.areas, rep = out[0].a, days = { reporting: 0, duplication: 0 };
    var hasQ1 = false, d1 = 0, d8 = 0;
    if (o1 && o1.h && o1.s >= 1) { hasQ1 = true; d1 = o1.h * 12 / DAY; rep.quant.push(fmt(T.reporting.q1, { h: n(o1.h), d: n(d1) })); }
    var o8 = opt('q8');
    if (o8 && o8.s >= 1) { d8 = o8.w * WEEKS / DAY; rep.quant.push(fmt(T.reporting.q8, { h: n(o8.w), d: n(d8) }) + (hasQ1 ? ' ' + T.reporting.overlap : '')); }
    days.reporting = Math.max(d1, d8);
    var repLabel = hasQ1 ? C.ui.statReporting : C.ui.statMgmt;
    var o2 = opt('q2'); if (o2 && o2.lag) out[1].a.quant.push(T.schedule.lag[o2.lag]);
    var o4 = opt('q4'); if (o4 && o4.days) out[3].a.quant.push(T.visibility.q4);
    if (A.visibility.noReports) out[3].a.quant.push(T.visibility.noReports);
    var o5 = opt('q5'); if (o5 && o5.y) { var d5 = o5.y / DAY; out[4].a.quant.push(fmt(T.duplication.q5, { d: n(d5) })); days.duplication = d5; }

    out.forEach(function (r) { r.days = days[r.key] || 0; });
    out[0].label = repLabel; out[4].label = C.ui.statDup;
    var flagged = out.filter(function (r) { return r.level !== 'ok'; })
      .sort(function (x, y) { return y.pct - x.pct || ORDER.indexOf(x.key) - ORDER.indexOf(y.key); });
    return { all: out, flagged: flagged, ok: out.filter(function (r) { return r.level === 'ok'; }) };
  }

  /* ───────────── RESULTS ───────────── */
  function areaCard(r, lead) {
    var T = C.areas[r.key], a = r.a;
    var h = '<article class="dx-area dx-' + r.level + (lead ? ' dx-lead' : '') + '">' +
      '<div class="dx-area-top"><span class="dx-chip dx-chip-' + r.level + '">' + C.levels[r.level] + '</span>' +
      '<span class="ctrl"><span>' + esc(T.name) + '</span><span class="sep">/</span><span class="hi">' + r.pct + '/100</span></span></div>' +
      '<h3 class="display">' + esc(r.level === 'bad' ? T.bad : T.watch) + '</h3>' +
      '<p>' + esc(T.body) + '</p>';
    if (a.quant.length) {
      h += '<ul class="dx-quant">' + a.quant.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>';
    }
    if (a.marked.length) {
      h += '<p class="dx-marked"><strong>' + C.ui.youMarked + '</strong> ' +
        a.marked.map(function (s) { return (ES ? '«' : '“') + esc(s) + (ES ? '»' : '”'); }).join(' ') + '</p>';
    }
    h += '<div class="dx-fix"><div class="k">' + C.ui.helps + '</div><p>' + esc(T.fix) + '</p></div>' +
      '<div class="dx-tools-k">' + C.ui.fit + '</div><div class="dx-tools">';
    T.tools.forEach(function (t) {
      var ext = t.href.indexOf('mailto:') === 0;
      h += '<div class="dx-tool"><h4>' + esc(t.name) + '</h4><p>' + esc(t.what) + '</p>' +
        '<a class="dx-link" href="' + t.href + '"' + (ext ? '' : '') + '>' + esc(t.cta) +
        '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>';
    });
    return h + '</div></article>';
  }

  /* ───────────── EMAIL GATE (Kit) ───────────── */
  var ACTION = 'https://app.kit.com/forms/10074070/subscriptions';
  var KEY = 'pmt_subscribed';
  function known() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }
  function send(body) {
    return fetch(ACTION, { method: 'POST', body: body, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || (j.status && j.status !== 'success')) throw new Error('rejected'); }); })
      .catch(function (e) {
        if (e && e.message === 'rejected') throw e;
        return fetch(ACTION, { method: 'POST', body: body, mode: 'no-cors' });   // response unreadable, request still reaches Kit
      });
  }
  var unlocked = known();
  function hideNews() { var nw = results.querySelector('.dx-news'); if (nw) nw.hidden = true; }

  function gateCard(R) {
    return '<div class="dx-gate" data-gate><div class="k">' + C.ui.gateK + '</div>' +
      '<h3 class="display">' + C.ui.gateH + '</h3><p>' + C.ui.gateP + '</p>' +
      '<div class="dx-gate-list"><div class="k2">' + C.ui.gateList + '</div><ul>' +
      R.flagged.map(function (r) { var T = C.areas[r.key]; return '<li><span class="dx-chip dx-chip-' + r.level + '">' + C.levels[r.level] + '</span>' + esc(r.level === 'bad' ? T.bad : T.watch) + '</li>'; }).join('') +
      '</ul></div>' +
      '<form novalidate class="dx-gate-form"><input type="email" name="email_address" required placeholder="' + C.ui.gatePh + '" aria-label="Email" autocomplete="email">' +
      '<button type="submit" class="btn btn-solid">' + C.ui.gateBtn + '</button></form>' +
      '<p class="dx-gate-msg" role="status" data-msg></p><p class="dx-gate-small">' + C.ui.gateSmall + '</p></div>';
  }

  function showResults() {
    var R = score();
    stage.hidden = true;
    var html = '<div class="eyebrow">' + C.ui.resultsEyebrow + '</div>';

    if (!R.flagged.length) {
      html += '<div class="dx-summary dx-summary-ok"><h2 class="display" tabindex="-1">' + C.allGood.h + '</h2><p>' + C.allGood.p + '</p>' +
        '<a class="btn btn-solid" href="' + C.allGood.href + '">' + C.allGood.cta + '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>';
    } else {
      var top = R.flagged[0];
      // headline stat: the biggest time figure among flagged, measurable areas
      var stat = R.flagged.filter(function (r) { return r.days >= 2; }).sort(function (x, y) { return y.days - x.days; })[0];
      html += '<div class="dx-summary"><div class="dx-sum-l"><div class="k">' + C.ui.biggest + '</div>' +
        '<h2 class="display" tabindex="-1">' + esc(C.areas[top.key].name) + '</h2>' +
        '<div class="dx-bars">' + R.all.slice().sort(function (x, y) { return y.pct - x.pct; }).map(function (r) {
          return '<div class="dx-bar"><span class="l">' + esc(C.areas[r.key].name) + '</span>' +
            '<span class="b"><i class="dx-' + r.level + '" style="width:' + Math.max(r.pct, 3) + '%"></i></span>' +
            '<span class="v">' + C.levels[r.level] + '</span></div>';
        }).join('') + '</div></div>';
      if (stat) {
        html += '<div class="dx-stat"><div class="n">≈ ' + n(stat.days) + '</div><div class="u">' + C.ui.daysUnit + '</div>' +
          '<div class="d">' + stat.label + '</div></div>';
      }
      html += '</div>';
      if (!unlocked) html += gateCard(R);
      html += '<div data-full' + (unlocked ? '' : ' hidden') + '>';
      R.flagged.forEach(function (r, i) {
        if (i === 1) html += '<div class="eyebrow dx-sub">' + C.ui.alsoTwo + '</div>';
        html += areaCard(r, i === 0);
      });
      html += '<div class="dx-good"><h4>' + C.ui.goodTitle + '</h4>' +
        (R.ok.length ? '<div class="chips">' + R.ok.map(function (r) { return '<span class="chip chip-gy">' + esc(C.areas[r.key].name) + '</span>'; }).join('') + '</div>'
          : '<p>' + C.ui.goodNone + '</p>') + '</div>';
    }

    html += '<div class="dx-actions"><button type="button" class="btn btn-line" data-print>' + C.ui.print + '</button>' +
      '<button type="button" class="btn btn-line" data-restart>' + C.ui.restart + '</button></div>' +
      '<p class="dx-method">' + C.ui.method + '</p>' + (R.flagged.length ? '</div>' : '');

    results.querySelector('[data-out]').innerHTML = html;
    results.hidden = false;
    if (unlocked) hideNews();
    var gate = results.querySelector('[data-gate]');
    if (gate) {
      // the full breakdown and the newsletter box wait behind the gate
      var nw = results.querySelector('.dx-news'); if (nw) nw.hidden = true;
      gate.querySelector('form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var input = ev.target.querySelector('input'), b = ev.target.querySelector('button'), msg = gate.querySelector('[data-msg]');
        var email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = C.ui.gateBad; input.focus(); return; }
        msg.textContent = ''; b.disabled = true; var label = b.textContent; b.textContent = C.ui.gateSending;
        var body = new FormData();
        body.append('email_address', email);
        // segmentation in Kit: create custom fields with these keys to keep the values
        body.append('fields[diagnostic_top]', R.flagged[0].key);
        body.append('fields[diagnostic_areas]', R.flagged.map(function (r) { return r.key + ':' + r.level; }).join(', '));
        body.append('fields[diagnostic_lang]', ES ? 'es' : 'en');
        send(body).then(function () {
          remember(); unlocked = true;
          gate.remove();
          var full = results.querySelector('[data-full]'); full.hidden = false;
          var first = full.querySelector('.dx-area h3'); if (first) { first.setAttribute('tabindex', '-1'); first.focus({ preventScroll: true }); }
          full.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }).catch(function () { msg.textContent = C.ui.gateErr; })
          .then(function () { b.disabled = false; b.textContent = label; });
      });
    }
    results.querySelector('[data-restart]').addEventListener('click', function () {
      answers = {}; step = 0; results.hidden = true; renderQ();
      var h = stage.querySelector('h2'); if (h) h.focus({ preventScroll: true });
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    results.querySelector('[data-print]').addEventListener('click', function () { window.print(); });
    var h2 = results.querySelector('h2'); if (h2) h2.focus({ preventScroll: true });
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ───────────── START ───────────── */
  var startBtn = root.querySelector('[data-start]');
  startBtn.addEventListener('click', function () {
    intro.hidden = true; step = 0; renderQ();
    var h = stage.querySelector('h2'); if (h) h.focus({ preventScroll: true });
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

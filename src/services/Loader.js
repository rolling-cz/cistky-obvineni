module.exports.loadData = () => {
    return formatData(getData());
}

function formatData(rawData) {
    const data = [];

    let i = 0;
    rawData.forEach(row => {
        data.push({
            "id": i++,
            "male": parseName(row[0]),
            "female": parseName(row[1]),
            "group": row[2],
            "activeState": 0,
            "overwrite": null
        })
    });

    return data;
}

function parseName(name) {
    const parts = name.split(" ");
    if (name.includes("von")) {
        return { firstName: parts[0], patronymic: null, lastName: parts[1] + ' ' + parts[2] + ' ' + parts[3]}
    } else if (parts.length === 2) {
        return { firstName: parts[0], patronymic: null, lastName: parts[1]}
    } else if (parts.length === 3) {
        return { firstName: parts[0], patronymic: parts[1], lastName: parts[2]}
    } else {
        throw new Error("Wrong format of name: " + name);
    }
}

function getData() {
  return [
    ["Anatol Nikolajevič Lebeděv","Antonina Nikolajevna Lebeděva","armáda"],
    ["Iosif Bogdanovič Malchikov","Izolda Bogdanovna Malchikova","armáda"],
    ["Lavrentij Denisovič Dworkin","Lara Denisovna Dworkina","armáda"],
    ["Alexei Glebovič Brusilov","Anna Glebovna Brusilova","armáda"],
    ["Mikhail Antonovič Dmitriev","Yana Antonovna Dmitriev","armáda"],
    ["Viktor - Arťuchin","VIktorie - Arťuchina","armáda"],
    ["Vadim Markovič Kiseljov","Varvara Markovna Kiseljovna","armáda"],
    ["Taras Bogdanovič Jakovlev","Taisia Bogranovna Jakovlevna","armáda"],
    ["Boleslav Kovář","Boleslava Kovář","internacionála"],
    ["Francois Lefebvre","Francoise Lefebvre","internacionála"],
    ["Enrico Belotti","Erika Belloti","internacionála"],
    ["Branko Radun","Božana Radun","internacionála"],
    ["Johann Rothstein von Waldburg","Johanna Rohstein von Waldburg","internacionála"],
    ["Walther Koch","Hertha Koch","internacionála"],
    ["Juan Delgado","Juana Delgado","internacionála"],
    ["Manuel Velazco","Manuela Velazco","internacionála"],
    ["Nikita Konstantinovič Baranov","Nika Konstantinovna Baranova","NKVD"],
    ["Vasilij Nikolajevič Smirnov","Valentina Nikolajevna Smirnova","NKVD"],
    ["Ivan Agadovič Beda","Irina Agadovna Beda","NKVD"],
    ["Sergej Pavlovič Kavan","Sergejevna Pavlovna Kavanova","NKVD"],
    ["Alexandr Ivanovič Gorbatko","Alexandra Ivanovna Gorbatko","NKVD"],
    ["Anton Andrejevič Gavrilov","Atnonina Andrejovna Gavrilova","NKVD"],
    ["Lev Dmitrijevič Vorobjov","Lada Dmitrijevna Vorobjovna","NKVD"],
    ["Makar Rodionovič Bělov","Marta Rodionovna Bělovna","NKVD"],
    ["Alexandr Pavlovič Sokolov","Alexandra Pavlovna Sokolova","politbyro"],
    ["Iwan Jakubovič Gomola","Iwona Jakubovna Gomola","politbyro"],
    ["Ivan Vasilijevič Nikulin","Inna Vasilijevna Nikulina","politbyro"],
    ["Denis Lvovič Uljanov","Dina Lvovna Uljanova","politbyro"],
    ["Vjačeslav Vjačeslavovič Solovjov","Fedosia Vjačeslavovna Solovjova","politbyro"],
    ["Fjodor Josipovič Zajcev","Florentina Josipovna Zajceva","referenti"],
    ["Artyom Timurovič Pavlenko","Alyona Timurovna Pavlenka","referenti"],
    ["Erik Antonovič Opokin","Elena Anatovna Opokina","referenti"],
    ["Zachar Jegorovič Minin","Zlata Jegorovna Minina","referenti"],
    ["Trofim Arturovič Kozlov","Tatyana Arturovna Kozlovna","referenti"],
    ["Sergei Kirillovič Filenkov","Světlana Kirillovna Filenkova","regiony"],
    ["Arkadij Otarovič Chačaturjan","Nana Otarovna Chačaturjana","regiony"],
    ["Lev Dimitrovič Kalganov","Lada Dimitrovna Kalganova","regiony"],
    ["Valerij Ivanovič Nikulin","Valerija Ivanovna Nikulina","regiony"],
    ["Vlad Makarovič Žabotinskij","Vladlena Makarovna Žabotinskaja","regiony"],
    ["Marat Abramovič Kulikov","Marina Abramovna Kulikova","regiony"],
    ["Andrej Juliovič Babuškin","Andrea Juliovna Babuškina","regiony"],
    ["Semjon Vladimirovič Menšikov","Světlana Vladimirovna Menšikova","regiony"],
    ["Kernius Ribikauskas","Asta Ribiskauskiene","regiony"],
    ["Taras Grigorovič Anikin","Taisa Grigorovna Anikina","regiony"],
    ["Izák Michajlovič Rosol","Sára Izákovna Rosolovna","regiony"],
    ["Adam Nikolajevič Pekar","Alina Nikolajevna Pekarova","regiony"],
    ["Ignat Romanovič Lazarev","Inga Romanovna Lazareva","TASS"],
    ["Jaromír Kovář","Jarmila Kovářová","TASS"],
    ["Konstantin Bogdanovič Ivchenko","Klementina Bogdanovna Ivchenka","TASS"],
    ["Gerasim Kirillovič Volkov","Galina Kirillovna Volkova","TASS"],
    ["Ruslan Štěpanovič Orlov","Ruslana Štěpanovna Orlova","TASS"],
    ["Yaroslav Maximoviš Kulagin","Yaroslava Maximovna Kulagina","TASS"],
    ["Jaroslav Sergejevič Prchalov","Jaroslav Sergejevič Prchalov","umělec"],
    ["Ivan Vladimirovič Čornyj","Ivana Vladimirovna Čorná","umělec"],
    ["Leonid Borisovič Sacharov","Ludmila Borisovna Sacharova","umělec"],
    ["Baltybaj Achimov","Tamara Achimová","umělec"],
    ["Arťom Severinovič Kazimirovič","Artemida Severinovna Kazimirovičova","umělec"],
    ["Ilia Michailovič Běljajev","Iskra Michailovna Běljajeva","umělec"],
    ["Marat Nikitič Popov","Marina Nikitovna Popova","umělec"]
  ]
}
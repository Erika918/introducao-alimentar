import { useEffect, useMemo, useState } from "react";
import { Search, Baby, ShieldCheck, AlertTriangle, CalendarDays, Heart, Sun, Utensils, Moon } from "lucide-react";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23E6E6FA'/%3E%3C/svg%3E";

const prepTipsByFood = {
  banana: "Oferecer amassada ou em tiras macias, sem casca.",
  maca: "Oferecer cozida e amassada nos primeiros meses.",
  "maçã": "Oferecer cozida e amassada nos primeiros meses.",
  pera: "Oferecer madura, amassada ou cozida, sem casca.",
  abacate: "Oferecer bem maduro e amassado.",
  laranja: "Oferecer o gomo sem pele e sem sementes.",
  mamao: "Oferecer bem maduro e amassado com garfo.",
  "mamão": "Oferecer bem maduro e amassado com garfo.",
  brocolis: "Oferecer os floretes bem cozidos e macios.",
  "brócolis": "Oferecer os floretes bem cozidos e macios.",
  abobrinha: "Oferecer cozida em tiras macias ou em pure.",
  moranga: "Oferecer bem cozida e amassada.",
  abobora: "Oferecer bem cozida e amassada.",
  "abóbora": "Oferecer bem cozida e amassada."
};

function getPrepTip(foodName) {
  const normalized = foodName.toLowerCase();
  const foundEntry = Object.entries(prepTipsByFood).find(([key]) => normalized.includes(key));
  return foundEntry
    ? foundEntry[1]
    : "Oferecer em textura segura para a idade, sem sal e sem acucar.";
}

function formatExternalFoodInfo(foodName) {
  return [
    `O que e: ${foodName}`,
    "Idade recomendada: Geralmente a partir dos 6 meses.",
    `Dica de preparo: ${getPrepTip(foodName)}`
  ].join("\n");
}

const foods = [
  {
    id: 1,
    name: "Abacate",
    canOffer: true,
    superHealthy: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1200&q=80",
    description: "Fonte de gorduras boas e textura macia para introducao alimentar."
  },
  {
    id: 2,
    name: "Banana",
    canOffer: true,
    superHealthy: true,
    imageUrl: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=1200&q=80",
    description: "Rica em potassio, facil de amassar e bem aceita pelos bebes."
  },
  {
    id: 3,
    name: "Morangos inteiros",
    canOffer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
    description: "Risco de engasgo quando oferecido inteiro; prefira amassado ou em tiras seguras."
  },
  {
    id: 4,
    name: "Mel",
    canOffer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1200&q=80",
    description: "Nao oferecer antes de 1 ano devido ao risco de botulismo infantil."
  },
  {
    id: 5,
    name: "Moranga (Abobora)",
    canOffer: true,
    superHealthy: true,
    imageUrl:
      "https://images.unsplash.com/photo-1664996794049-b3cc5eb92ca9?auto=format&fit=crop&w=1200&q=80",
    description: "Rica em vitamina A, otima para o inicio da introducao alimentar."
  },
  {
    id: 6,
    name: "Abobrinha",
    canOffer: true,
    superHealthy: true,
    imageUrl:
      "https://images.unsplash.com/photo-1535734442109-da3c28a9e51e?auto=format&fit=crop&w=1200&q=80",
    description: "Facil digestao e muito versatil para preparar em tiras ou pure."
  },
  {
    id: 7,
    name: "Brocolis",
    canOffer: true,
    superHealthy: true,
    imageUrl:
      "https://images.unsplash.com/photo-1685504445355-0e7bdf90d415?auto=format&fit=crop&w=1200&q=80",
    description: "Excelente fonte de ferro e fibras. Ofereca os floretes bem cozidos."
  }
];

const forbiddenUnderOne = [
  "Mel (risco de botulismo infantil)",
  "Leite de vaca como bebida principal",
  "Acucar e produtos com acucar adicionado",
  "Ultraprocessados (refrigerante, salgadinhos, embutidos)",
  "Alimentos com muito sal"
];

const initialWeeklyDiary = [
  {
    id: 1,
    day: "Segunda",
    breakfast: "Banana amassada + agua",
    lunch: "Batata-doce cozida + frango desfiado",
    dinner: "Legumes cozidos em tiras + arroz"
  },
  {
    id: 2,
    day: "Terca",
    breakfast: "Mingau sem acucar + fruta macia",
    lunch: "Arroz, feijao e legumes bem cozidos",
    dinner: "Pure de abobora com frango desfiado"
  },
  {
    id: 3,
    day: "Quarta",
    breakfast: "Abacate amassado com pouca agua",
    lunch: "Abobrinha cozida + carne moida",
    dinner: "Brocolis cozido + arroz"
  },
  {
    id: 4,
    day: "Quinta",
    breakfast: "Pera cozida amassada",
    lunch: "Moranga cozida + frango desfiado",
    dinner: "Sopa de legumes amassados"
  },
  {
    id: 5,
    day: "Sexta",
    breakfast: "Iogurte natural sem acucar + fruta",
    lunch: "Arroz + feijao + cenoura cozida",
    dinner: "Pure de batata com legumes"
  }
];

function FoodCard({ food, isDarkMode }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl shadow-sm ring-1 ${
        isDarkMode ? "bg-[#1F1B2E] ring-white/10" : "bg-white ring-black/5"
      }`}
    >
      <div className={`h-[200px] w-full shrink-0 overflow-hidden ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}>
        <img
          src={food.imageUrl}
          alt={food.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>{food.name}</h3>
          {food.superHealthy ? (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">
              <Heart size={12} fill="currentColor" />
              Super saudável
            </span>
          ) : null}
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            food.canOffer ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {food.canOffer ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
          {food.canOffer ? "Pode oferecer" : "Nao oferecer"}
        </span>
      </div>
      <p className={`px-4 pb-4 text-sm leading-relaxed ${isDarkMode ? "text-white/80" : "text-black/80"}`}>
        {food.description}
      </p>
    </article>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weeklyDiary, setWeeklyDiary] = useState(initialWeeklyDiary);
  const [externalResult, setExternalResult] = useState(null);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);
  const [externalSearchError, setExternalSearchError] = useState("");

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => food.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [query]);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 2 || filteredFoods.length > 0) {
      setExternalResult(null);
      setIsSearchingExternal(false);
      setExternalSearchError("");
      return;
    }

    let isCancelled = false;
    const timeoutId = setTimeout(async () => {
      try {
        setIsSearchingExternal(true);
        setExternalSearchError("");
        const searchTerm = `${normalizedQuery} introdução alimentar`;

        const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(
          searchTerm
        )}&format=json&no_html=1&no_redirect=1&skip_disambig=1`;
        const ddgResponse = await fetch(ddgUrl);
        const ddgData = await ddgResponse.json();

        const topic = ddgData?.Heading || normalizedQuery;
        const topicText = formatExternalFoodInfo(ddgData?.Heading || normalizedQuery);
        const topicUrl = ddgData?.AbstractURL || `https://duckduckgo.com/?q=${encodeURIComponent(searchTerm)}`;

        let imageUrl = ddgData?.Image || "";
        if (imageUrl && imageUrl.startsWith("/")) {
          imageUrl = `https://duckduckgo.com${imageUrl}`;
        }

        if (!imageUrl) {
          const wikiSearchResponse = await fetch(
            `https://pt.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages|extracts&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=800&titles=${encodeURIComponent(
              normalizedQuery
            )}`
          );
          const wikiData = await wikiSearchResponse.json();
          const pages = wikiData?.query?.pages ? Object.values(wikiData.query.pages) : [];
          const firstPage = pages.find((page) => page && page.pageid && page.pageid !== -1);

          if (firstPage?.thumbnail?.source) {
            imageUrl = firstPage.thumbnail.source;
          }

          if (firstPage?.title) {
            const wikiTitle = firstPage.title || topic;
            if (!isCancelled) {
              setExternalResult({
                title: wikiTitle,
                summary: formatExternalFoodInfo(wikiTitle),
                imageUrl: imageUrl || FALLBACK_IMAGE,
                sourceUrl: `https://pt.wikipedia.org/wiki/${encodeURIComponent(wikiTitle.replaceAll(" ", "_"))}`
              });
              return;
            }
          }
        }

        if (!isCancelled) {
          setExternalResult({
            title: topic,
            summary: topicText,
            imageUrl: imageUrl || FALLBACK_IMAGE,
            sourceUrl: topicUrl
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setExternalSearchError("Nao foi possivel buscar informacoes externas agora.");
          setExternalResult(null);
        }
      } finally {
        if (!isCancelled) {
          setIsSearchingExternal(false);
        }
      }
    }, 450);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query, filteredFoods.length]);

  const handleMealChange = (dayId, mealPeriod, value) => {
    setWeeklyDiary((currentDays) =>
      currentDays.map((day) => (day.id === dayId ? { ...day, [mealPeriod]: value } : day))
    );
  };

  return (
    <main
      className={`min-h-screen px-4 py-6 transition-colors ${
        isDarkMode ? "bg-gradient-to-b from-[#1B1530] to-[#0F0D18] text-white" : "bg-gradient-to-b from-[#FFB6C1] to-[#E6E6FA] text-black"
      }`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header
          className={`rounded-3xl p-5 shadow-md backdrop-blur ${
            isDarkMode ? "bg-[#1F1B2E]/95" : "bg-white/90"
          }`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Baby className={isDarkMode ? "text-white" : "text-black"} />
              <h1 className="text-xl font-bold">Introducao Alimentar</h1>
            </div>
            <button
              type="button"
              onClick={() => setIsDarkMode((currentMode) => !currentMode)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                isDarkMode
                  ? "bg-[#C4B5FD] text-[#2E1065] hover:bg-[#A78BFA]"
                  : "bg-[#2E1065] text-white hover:bg-[#4C1D95]"
              }`}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              {isDarkMode ? "Modo Claro" : "Modo Noturno"}
            </button>
          </div>
          <p className={`mb-4 text-sm ${isDarkMode ? "text-white/80" : "text-black/80"}`}>
            Busque alimentos e veja orientacoes rapidas para apoiar uma rotina segura e amigavel.
          </p>
          <label
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
              isDarkMode ? "border-white/15 bg-[#2A2540]" : "border-black/10 bg-white"
            }`}
          >
            <Search size={18} className={isDarkMode ? "text-white/60" : "text-black/60"} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar alimento..."
              className={`w-full bg-transparent text-sm outline-none ${
                isDarkMode ? "placeholder:text-white/45" : "placeholder:text-black/50"
              }`}
            />
          </label>
        </header>

        <section>
          <h2 className="mb-3 text-lg font-bold">Cards Informativos</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => <FoodCard key={food.id} food={food} isDarkMode={isDarkMode} />)
            ) : (
              <p
                className={`rounded-2xl p-4 text-sm shadow-sm ${
                  isDarkMode ? "bg-[#1F1B2E] text-white/85" : "bg-white"
                }`}
              >
                Nenhum alimento local encontrado.
              </p>
            )}
          </div>
          {filteredFoods.length === 0 && query.trim().length >= 2 ? (
            <div className="mt-4">
              {isSearchingExternal ? (
                <p className="rounded-2xl bg-[#F5F3FF] p-4 text-sm font-medium text-[#6D28D9] shadow-sm">
                  Buscando informacoes na internet...
                </p>
              ) : null}
              {externalSearchError ? (
                <p className="rounded-2xl bg-[#FDF2F8] p-4 text-sm font-medium text-[#BE185D] shadow-sm">
                  {externalSearchError}
                </p>
              ) : null}
              {externalResult ? (
                <article
                  className={`overflow-hidden rounded-2xl shadow-sm ring-1 ${
                    isDarkMode ? "bg-[#1F1B2E] ring-[#6D28D9]/40" : "bg-white ring-[#E9D5FF]"
                  }`}
                >
                  <div className="h-[200px] w-full overflow-hidden bg-[#EDE9FE]">
                    <img
                      src={externalResult.imageUrl}
                      alt={externalResult.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 bg-gradient-to-b from-[#FDF2F8] to-[#F5F3FF] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">
                      Resultado externo
                    </p>
                    <h3 className="text-lg font-bold text-[#3B0764]">{externalResult.title}</h3>
                    <p
                      className={`whitespace-pre-line text-sm leading-relaxed ${
                        isDarkMode ? "text-white/80" : "text-black/80"
                      }`}
                    >
                      {externalResult.summary}
                    </p>
                    <a
                      href={externalResult.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-[#C4B5FD] px-3 py-1 text-xs font-semibold text-[#4C1D95] transition hover:bg-[#A78BFA]"
                    >
                      Ver fonte
                    </a>
                  </div>
                </article>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className={`rounded-3xl p-5 shadow-md ${isDarkMode ? "bg-[#1F1B2E]" : "bg-white"}`}>
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            <h2 className="text-lg font-bold">Proibidos para menores de 1 ano</h2>
          </div>
          <ul className="space-y-2">
            {forbiddenUnderOne.map((item) => (
              <li key={item} className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={`rounded-3xl p-5 shadow-md ${isDarkMode ? "bg-[#1F1B2E]" : "bg-white"}`}>
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays size={20} />
            <h2 className="text-lg font-bold">Diario Alimentar</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {weeklyDiary.map((day) => (
              <article
                key={day.id}
                className={`rounded-2xl p-4 shadow-sm ring-1 ${isDarkMode ? "bg-[#2A2540] ring-white/10" : "bg-white ring-black/5"}`}
              >
                <h3 className="mb-3 text-base font-bold text-[#4C1D95]">{day.day}</h3>

                <div className="space-y-3">
                  <div className="rounded-xl bg-[#F5F3FF] p-3">
                    <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-[#7C3AED]">
                      <Sun size={14} />
                      Cafe da manha
                    </label>
                    <input
                      type="text"
                      value={day.breakfast}
                      onChange={(event) => handleMealChange(day.id, "breakfast", event.target.value)}
                      className="w-full rounded-lg border border-[#DDD6FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#A78BFA]"
                    />
                  </div>

                  <div className="rounded-xl bg-[#FDF2F8] p-3">
                    <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-[#BE185D]">
                      <Utensils size={14} />
                      Almoco
                    </label>
                    <input
                      type="text"
                      value={day.lunch}
                      onChange={(event) => handleMealChange(day.id, "lunch", event.target.value)}
                      className="w-full rounded-lg border border-[#FBCFE8] bg-white px-3 py-2 text-sm outline-none focus:border-[#F472B6]"
                    />
                  </div>

                  <div className="rounded-xl bg-[#EEF2FF] p-3">
                    <label className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-[#4338CA]">
                      <Moon size={14} />
                      Janta
                    </label>
                    <input
                      type="text"
                      value={day.dinner}
                      onChange={(event) => handleMealChange(day.id, "dinner", event.target.value)}
                      className="w-full rounded-lg border border-[#C7D2FE] bg-white px-3 py-2 text-sm outline-none focus:border-[#818CF8]"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;

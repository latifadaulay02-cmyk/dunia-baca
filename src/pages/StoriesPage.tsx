import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import { INTERACTIVE_STORIES } from '../data/storiesData';
import { InteractiveStory } from '../types';
import { StoryReader } from '../components/StoryReader';
import { useApp } from '../context/AppContext';

export const StoriesPage: React.FC = () => {
  const { profile, recordStoryComplete, playClick } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeStory, setActiveStory] = useState<InteractiveStory | null>(null);

  useEffect(() => {
    const id = searchParams.get('cerita');
    if (id) {
      const found = INTERACTIVE_STORIES.find((s) => s.id === id);
      if (found) setActiveStory(found);
    }
  }, [searchParams]);

  const handleOpenStory = (story: InteractiveStory) => {
    playClick();
    setActiveStory(story);
    setSearchParams({ cerita: story.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setActiveStory(null);
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 via-white to-pink-50 p-6 sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
          <Sparkles className="h-8 w-8 text-purple-600" />
          <span>Dunia Dongeng Interaktif</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Nikmati dongeng bergambar dengan nilai moral kebaikan. Kamu juga bisa menyalakan fitur
          narasi suara dan menjawab pertanyaan seru di akhir cerita!
        </p>
      </div>

      {activeStory ? (
        <StoryReader
          title={activeStory.title}
          subtitle={`Nilai Moral: ${activeStory.moralValue} · ${activeStory.duration}`}
          pages={activeStory.pages}
          moralValue={activeStory.moralValue}
          moralDescription={activeStory.moralDescription}
          comprehensionQuiz={activeStory.quiz}
          alreadyCompleted={profile.completedStoryIds.includes(activeStory.id)}
          onComplete={(bonus) => recordStoryComplete(activeStory.id, activeStory.title, bonus)}
          onClose={handleClose}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INTERACTIVE_STORIES.map((story) => {
            const done = profile.completedStoryIds.includes(story.id);
            return (
              <article
                key={story.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="aspect-[4/3] overflow-hidden bg-purple-50 dark:bg-slate-800">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="text-purple-600 dark:text-purple-400">{story.moralValue}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.duration}</span>
                    {done && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Selesai
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
                    {story.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {story.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleOpenStory(story)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700 active:scale-[0.98]"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Baca & Dengarkan Dongeng</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

import FeedbackForm from '@/app/components/FeedbackForm';
import FeedbackList from '@/app/components/FeedbackList';
import ThemeToggle from '@/app/components/ThemeToggle';
import Watermark from '@/app/components/Watermark';
import './globals.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Feedback Collector
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We value your thoughts and suggestions
            </p>
          </div>
          <ThemeToggle />
        </header>

        <main className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
            <FeedbackForm />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
            <FeedbackList />
          </div>
        </main>

        <Watermark />
      </div>
    </div>
  );
}
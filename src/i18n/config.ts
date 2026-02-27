import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            nav: {
                discover: "Discover",
                gramSathi: "AI GramSathi",
                avatar: "AI Avatar",
                login: "Login"
            },
            hero: {
                title: "Evolve Your Future with Gram Era",
                subtitle: "India's first AI-powered bilingual mentor & skill sharing community.",
                cta_primary: "Explore Mentors",
                cta_secondary: "Talk to GramSathi"
            },
            discover: {
                title: "Find Your Mentor",
                filter_all: "All Industries",
                book_now: "Book Session",
                skill_swap: "SkillSwap Marketplace",
                teach: "I can teach",
                learn: "I want to learn",
                suggest: "AI Match Suggestion"
            },
            gramsathi: {
                welcome: "Hello, I am GramSathi. How can I help you today?",
                placeholder: "Ask me anything in your language...",
                voice_start: "Listening...",
                analysis: "Skill Gap Analysis"
            },
            avatar: {
                start: "Start Immersive Session",
                status: "Avatar Ready"
            }
        }
    },
    hi: {
        translation: {
            nav: {
                discover: "खोजें",
                gramSathi: "AI ग्रामसाथी",
                avatar: "AI अवतार",
                login: "लॉगिन"
            },
            hero: {
                title: "ग्राम एरा के साथ अपने भविष्य को संवारें",
                subtitle: "भारत का पहला एआई-आधारित द्विभाषी संरक्षक और कौशल साझाकरण समुदाय।",
                cta_primary: "मेंटर्स खोजें",
                cta_secondary: "ग्रामसाथी से बात करें"
            }
        }
    },
    bn: {
        translation: {
            nav: {
                discover: "আবিষ্কার করুন",
                gramSathi: "AI গ্রামসাথী",
                avatar: "AI অবতার",
                login: "লগইন"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

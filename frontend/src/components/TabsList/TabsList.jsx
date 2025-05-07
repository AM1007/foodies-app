import styles from './TabsList.module.css';

const TABS_OWN = [
  { id: 'my-recipes', label: 'My recipes' },
  { id: 'my-favorites', label: 'My favorites' },
  { id: 'followers', label: 'Followers' },
  { id: 'following', label: 'Following' },
];

const TABS_OTHER = [
  { id: 'recipes', label: 'Recipes' },
  { id: 'followers', label: 'Followers' },
];

export default function TabsList({ isOwnProfile, activeTab, setActiveTab }) {
  const tabs = isOwnProfile ? TABS_OWN : TABS_OTHER;

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${
            activeTab === tab.id ? styles.active : ''
          }`}
          onClick={() => setActiveTab(tab.id)} 
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

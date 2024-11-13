INSERT INTO TEAM_MEMBER (id, name, status, availability) VALUES
(1, 'John Doe', 'available', 85),
(2, 'Jane Smith', 'busy', 25),
(3, 'Mike Johnson', 'available', 60),
(4, 'Sarah Williams', 'busy', 30);

INSERT INTO PROJECT (id, name, status, progress, due_date) VALUES
(1, 'Website Redesign', 'On Track', 75, '2024-12-01'),
(2, 'Mobile App', 'At Risk', 45, '2024-11-15'),
(3, 'Database Migration', 'Delayed', 30, '2024-10-30');

INSERT INTO ALERT (id, type, message) VALUES
(1, 'warning', '3 team members are approaching capacity'),
(2, 'info', 'New project resources available'),
(3, 'error', 'Server capacity reaching critical levels');
